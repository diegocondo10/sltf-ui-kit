"use client";

import { useForm } from "react-hook-form";
import {
  TextField,
  TextareaField,
  SelectField,
  DateField,
  NumberField,
} from "@/components";

interface FormData {
  name: string;
  email: string;
  description: string;
  country: string;
  birthdate: Date | null;
  price: number | null;
  quantity: number | null;
}

const countryOptions = [
  { label: "United States", value: "us" },
  { label: "Canada", value: "ca" },
  { label: "Mexico", value: "mx" },
  { label: "Colombia", value: "co" },
  { label: "Argentina", value: "ar" },
];

export default function Home() {
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      description: "",
      country: "",
      birthdate: null,
      price: null,
      quantity: null,
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Form data:", data);
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">UI Kit</h1>
          <p className="text-lg text-gray-600">
            Libreria de componentes reutilizables con React Hook Form, Tailwind CSS y SCSS.
          </p>
        </header>

        {/* Demo Form */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Demo: Formulario de prueba
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Default Variant */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                Variant: Default
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextField
                  name="name"
                  control={control}
                  label="Nombre completo"
                  placeholder="John Doe"
                  rules={{ required: "El nombre es requerido" }}
                  required
                />

                <TextField
                  name="email"
                  control={control}
                  label="Correo electrónico"
                  type="email"
                  placeholder="john@example.com"
                  rules={{
                    required: "El correo es requerido",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Correo inválido",
                    },
                  }}
                  required
                />
              </div>

              <TextareaField
                name="description"
                control={control}
                label="Descripción"
                placeholder="Escribe una descripción..."
                rows={4}
                hint="Máximo 500 caracteres"
                rules={{ maxLength: { value: 500, message: "Máximo 500 caracteres" } }}
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <SelectField
                  name="country"
                  control={control}
                  label="País"
                  options={countryOptions}
                  placeholder="Selecciona un país"
                  rules={{ required: "Selecciona un país" }}
                  required
                />

                <DateField
                  name="birthdate"
                  control={control}
                  label="Fecha de nacimiento"
                  placeholder="Selecciona fecha"
                  dateFormat="dd/MM/yyyy"
                  maxDate={new Date()}
                />

                <NumberField
                  name="quantity"
                  control={control}
                  label="Cantidad"
                  placeholder="0"
                  formatType="integer"
                  min={1}
                  max={100}
                />
              </div>

              <NumberField
                name="price"
                control={control}
                label="Precio"
                placeholder="0.00"
                formatType="currency"
                currency="USD"
                hint="Ingresa el precio en USD"
              />
            </div>

            {/* Floating Variant */}
            <div className="space-y-4 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                Variant: Floating Label
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextField
                  name="floatingName"
                  control={control}
                  label="Nombre completo"
                  variant="floating"
                />

                <TextField
                  name="floatingEmail"
                  control={control}
                  label="Correo electrónico"
                  type="email"
                  variant="floating"
                />
              </div>
            </div>

            {/* Submit */}
            <div className="pt-6 border-t border-gray-200">
              <button
                type="submit"
                className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Enviar formulario
              </button>
            </div>
          </form>
        </section>

        {/* Sizes Demo */}
        <section className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Demo: Tamaños
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <TextField
              name="sizeSm"
              control={control}
              label="Small"
              placeholder="Size SM"
              size="sm"
            />

            <TextField
              name="sizeMd"
              control={control}
              label="Medium (default)"
              placeholder="Size MD"
              size="md"
            />

            <TextField
              name="sizeLg"
              control={control}
              label="Large"
              placeholder="Size LG"
              size="lg"
            />
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>UI Kit v0.1.0 - @slft/ui-kit</p>
        </footer>
      </div>
    </main>
  );
}
