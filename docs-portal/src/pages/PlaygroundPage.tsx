import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  baseUrl: z.string().url(),
  page: z.number().int().min(1),
  perPage: z.number().int().min(1).max(1000)
});

type FormValues = z.infer<typeof schema>;

export function PlaygroundPage() {
  const [result, setResult] = useState<string>('');
  const { register, handleSubmit, formState } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      baseUrl: 'http://localhost:8000',
      page: 1,
      perPage: 50
    }
  });

  const onSubmit = async (values: FormValues) => {
    const url = `${values.baseUrl}/api/v1/repositories?page=${values.page}&per_page=${values.perPage}`;
    const res = await fetch(url);
    const json = await res.json();
    setResult(JSON.stringify(json, null, 2));
  };
  return (
    <div className="space-y-4">
      <div className="bg-surface p-4 rounded">
        <form className="grid gap-3" onSubmit={handleSubmit(onSubmit)}>
          <label className="text-sm">
            Base URL
            <input className="w-full p-2 bg-background rounded" {...register('baseUrl')} />
          </label>
          <label className="text-sm">
            Page
            <input
              className="w-full p-2 bg-background rounded"
              type="number"
              {...register('page', { valueAsNumber: true })}
            />
          </label>
          <label className="text-sm">
            Per Page
            <input
              className="w-full p-2 bg-background rounded"
              type="number"
              {...register('perPage', { valueAsNumber: true })}
            />
          </label>
          {formState.errors.baseUrl && (
            <div className="text-red-400 text-sm">Enter a valid base URL</div>
          )}
          <button type="submit" className="px-3 py-2 rounded bg-primary text-black">
            Run Request
          </button>
        </form>
      </div>
      <pre className="bg-background p-3 rounded text-sm overflow-auto">{result}</pre>
    </div>
  );
}
