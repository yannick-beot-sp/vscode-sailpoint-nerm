<script lang="ts">
  import { toast } from "svelte-sonner";
  import { createForm } from "felte";
  import { reporter, ValidationMessage } from "@felte/reporter-svelte";
  import { validator } from "@felte/validator-yup";
  import * as yup from "yup";

  import { Copy as CopyIcon } from "lucide-svelte";

  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import Select from "$lib/components/simple-select/select.svelte";
  import { Switch } from "$lib/components/ui/switch/index.js";
  import { copyText } from "$lib/utils";

  import type { Status, User } from "src/model/User";
  import type { Client } from "src/services/Client";

  interface Props {
    user: User;
    client: Client;
    updateRow: (u: User) => void;
  }

  const userTypes = ["NeprofileUser", "NeaccessUser"];

  let { user = $bindable(), client, updateRow }: Props = $props();

  let statusChecked = $state(user.status === "Active");
  let statusLabel: Status = $derived(statusChecked ? "Active" : "Disabled");

  const schema = yup.object({
    email: yup.string().label("Email").email().required(),
    name: yup.string().label("Name").trim().required(),
    login: yup.string().label("Login").trim().required(),
    type: yup.string().label("Type").required().oneOf(userTypes),
    status: yup
      .string()
      .label("Status")
      .required()
      .oneOf(["Active", "Disabled"]),
    title: yup.string().label("Title").trim().notRequired(),
  });

  const { form, setFields } = createForm({
    initialValues: user,
    extend: [reporter, validator({ schema })],
    onSubmit: async (values) => {
      console.log(values);

      //@ts-ignore
      await client.updateUser({
        ...values,
        id: user.id,
      });
      user = { ...user, ...values };
      updateRow(user);
      toast.success("User updated");
    },
  });
</script>

<form use:form>
  <div class="flex flex-col mb-4">
    <Label class="label">ID</Label>
    <p>
      {user.id}
      <Button
        variant="ghost"
        size="icon"
        class="relative size-8 p-0"
        onclick={async () => copyText(user.id)}
      >
        <CopyIcon />
      </Button>
    </p>
  </div>
  <div class="flex flex-col mb-4">
    <Label for="email" class="label">Email</Label>
    <Input type="email" name="email" id="email" />
    <ValidationMessage for="email" let:messages={message}>
      <span class="error">{message}</span>
    </ValidationMessage>
  </div>
  <div class="flex flex-col mb-4">
    <Label for="name" class="label">Name</Label>
    <Input name="name" id="name" required />
    <ValidationMessage for="name" let:messages={message}>
      <span class="error">{message}</span>
    </ValidationMessage>
  </div>
  <div class="flex flex-col mb-4">
    <Label for="login" class="label">Login</Label>
    <Input name="login" id="login" required />
    <ValidationMessage for="login" let:messages={message}>
      <span class="error">{message}</span>
    </ValidationMessage>
  </div>
  <div class="flex flex-col mb-4">
    <Label for="title" class="label">Title</Label>
    <Input name="title" id="title" />
    <ValidationMessage for="title" let:messages={message}>
      <span class="error">{message}</span>
    </ValidationMessage>
  </div>
  <div class="flex flex-col mb-4">
    <Label for="type" class="label">Type</Label>
    <Select name="type" required id="type" items={userTypes} />
    <ValidationMessage for="type" let:messages={message}>
      <span class="error">{message}</span>
    </ValidationMessage>
  </div>
  <div class="flex flex-col mb-4">
    <Label class="label">Status</Label>
    <div class="flex items-center space-x-2 mb-4">
      <Switch
        id="statusSwitch"
        bind:checked={statusChecked}
        onCheckedChange={() => {
          setFields("status", statusLabel, true);
        }}
      />
      <Label for="statusSwitch">{statusLabel}</Label>
      <Input type="hidden" name="status" />
      <ValidationMessage for="status" let:messages={message}>
        <span class="error">{message}</span>
      </ValidationMessage>
    </div>
  </div>
  <Button type="submit">Save</Button>
</form>

<style>
  :global(.label) {
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: var(--color-gray-900);
  }

  :global(.error) {
    color: hsl(var(--destructive) / 1);
  }

  :global(input[aria-invalid="true"]) {
    --tw-ring-color: hsl(var(--destructive) / 1) !important;
    background-color: hsl(var(--destructive) / 0.1);
  }
</style>
