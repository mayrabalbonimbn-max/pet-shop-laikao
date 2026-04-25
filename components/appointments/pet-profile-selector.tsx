"use client";

import { CustomerProfile, PetProfile, PetSize, PetSpecies } from "@/domains/appointments/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

type CustomerWithPets = CustomerProfile & { pets: PetProfile[] };

type NewProfileForm = {
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  petName: string;
  petBreed: string;
  petSpecies: PetSpecies;
  petSize: PetSize;
};

export function PetProfileSelector({
  customers,
  mode,
  selectedCustomerId,
  selectedPetId,
  form,
  onModeChange,
  onExistingChange,
  onFormChange
}: {
  customers: CustomerWithPets[];
  mode: "existing" | "new";
  selectedCustomerId?: string;
  selectedPetId?: string;
  form: NewProfileForm;
  onModeChange: (mode: "existing" | "new") => void;
  onExistingChange: (payload: { customerId?: string; petId?: string }) => void;
  onFormChange: (field: keyof NewProfileForm, value: string) => void;
}) {
  const selectedCustomer = customers.find((customer) => customer.id === selectedCustomerId);

  return (
    <Tabs value={mode} onValueChange={(value) => onModeChange(value as "existing" | "new")} className="surface-default p-5">
      <div className="space-y-4">
        <div className="space-y-1">
          <p className="text-sm font-semibold text-ink-900">Tutor e pet</p>
          <p className="text-sm text-stone-500">Selecione um cadastro existente ou preencha um novo perfil.</p>
        </div>
        <TabsList>
          <TabsTrigger value="existing">Cadastro existente</TabsTrigger>
          <TabsTrigger value="new">Novo tutor + pet</TabsTrigger>
        </TabsList>

        <TabsContent value="existing" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-ink-900">Tutor</label>
              <Select
                value={selectedCustomerId}
                onValueChange={(value) => onExistingChange({ customerId: value, petId: undefined })}
                placeholder="Selecione o tutor"
                options={customers.map((customer) => ({
                  label: `${customer.fullName} • ${customer.phone}`,
                  value: customer.id
                }))}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-ink-900">Pet</label>
              <Select
                value={selectedPetId}
                onValueChange={(value) => onExistingChange({ customerId: selectedCustomerId, petId: value })}
                placeholder="Selecione o pet"
                options={(selectedCustomer?.pets ?? []).map((pet) => ({
                  label: `${pet.name} • ${pet.breed ?? pet.species}`,
                  value: pet.id
                }))}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="new" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Input placeholder="Nome do tutor" value={form.customerName} onChange={(event) => onFormChange("customerName", event.target.value)} />
            <Input placeholder="Telefone / WhatsApp" value={form.customerPhone} onChange={(event) => onFormChange("customerPhone", event.target.value)} />
            <Input placeholder="E-mail" value={form.customerEmail} onChange={(event) => onFormChange("customerEmail", event.target.value)} />
            <Input placeholder="Nome do pet" value={form.petName} onChange={(event) => onFormChange("petName", event.target.value)} />
            <Input placeholder="Raça" value={form.petBreed} onChange={(event) => onFormChange("petBreed", event.target.value)} />
            <Select
              value={form.petSpecies}
              onValueChange={(value) => onFormChange("petSpecies", value)}
              placeholder="Espécie"
              options={[
                { label: "Cachorro", value: "dog" },
                { label: "Gato", value: "cat" },
                { label: "Outro", value: "other" }
              ]}
            />
            <Select
              value={form.petSize}
              onValueChange={(value) => onFormChange("petSize", value)}
              placeholder="Porte"
              options={[
                { label: "Pequeno", value: "small" },
                { label: "Médio", value: "medium" },
                { label: "Grande", value: "large" },
                { label: "Gigante", value: "giant" }
              ]}
            />
          </div>
        </TabsContent>
      </div>
    </Tabs>
  );
}
