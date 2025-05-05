<script lang="ts">
  import DataTable from "../user-datatable/data-table.svelte";
  import { getColumns, type MyColumnDef } from "./columns";
  import { onMount } from "svelte";
  import type { Profile } from "src/model/Profile";
  import { ClientFactory } from "../../services/ClientFactory";
  import Spinner from "$lib/components/Spinner.svelte";
  import type { Attribute, AttributeWithOptions } from "src/model/Attribute";
  import ActionEdit from "./action-edit.svelte";
  import { filters } from "./faceted-filters";

  type Props = {
    profileTypeId: string;
    profileId?: string;
  };

  let { profileTypeId, profileId = undefined }: Props = $props();

  let client = ClientFactory.getClient();
  let profiles: Profile[] = $state<Profile[]>([]);
  let profile: Profile | undefined = $state<Profile | undefined>(undefined);
  let attributes: AttributeWithOptions[] = $state<AttributeWithOptions[]>([]);
  let columns: MyColumnDef<Profile>[] = $state<MyColumnDef<Profile>[]>([]);

  let loading = $state(true);

  let meta = $derived({
    attributes,
  });

  async function getData(forceRefresh?: boolean) {
    loading = true;
    attributes = await client.getAttributes(forceRefresh);
    columns = await getColumns(client, attributes);
    console.log("got column", columns);
    let tmprofiles: Profile[] | undefined;
    if (!forceRefresh) {
      tmprofiles = client.getData<Profile>();
    }
    if (!tmprofiles) {
      console.log({ profileTypeId });
      tmprofiles = await client.getProfiles(profileTypeId, forceRefresh);
      client.setData(tmprofiles);
    }
    profiles = tmprofiles;
    loading = false;
    console.log("data loaded");
  }
  onMount(async () => {
    await getData();
    console.log({ profileId });

    if (profileId) {
      profile = profiles.find((x) => x.id === profileId);
      console.log({ profile });
    }
  });

  function updateProfile(p: Profile) {
    //Using map (creates a new array)
    profiles = profiles.map((profile) => (profile.id === p.id ? p : profile));
  }
</script>

{#if loading}
  <div class="flex justify-center gap-3">
    <Spinner show={true} />
  </div>
{:else}
  <DataTable
    bind:data={profiles}
    {columns}
    {client}
    {meta}
    refresh={getData}
    tableId={`profiles/${profileTypeId}`}
    {filters}
  />
{/if}

{#if profile}
  <ActionEdit
    {profile}
    {client}
    updateRow={updateProfile}
    {attributes}
    mode="view"
    open={true}
    hidden={true}
  />
{/if}
