<script lang="ts">
  import DataTable from "../user-datatable/data-table.svelte";
  import { getColumns, type MyColumnDef } from "./columns";
  import { onMount } from "svelte";
  import type { Profile } from "src/model/Profile";
  import { ClientFactory } from "../../services/ClientFactory";
  import Spinner from "$lib/components/Spinner.svelte";
  import type { Attribute } from "src/model/Attribute";

  type Props = {
    profileTypeId: string;
  };

  let { profileTypeId }: Props = $props();

  let client = ClientFactory.getClient();
  let profiles: Profile[] = $state<Profile[]>([]);
  let attributes: Attribute[] = $state<Attribute[]>([]);
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
  });
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
    meta={meta}
    refresh={getData}
    tableId={`profiles/${profileTypeId}`}
  />
{/if}
