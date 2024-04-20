"use client";
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  name: z.string(),
  email: z.string().email(),
  num: z.string().min(10),
  message: z.string()
});

type FormData = z.infer<typeof schema>;

const FormComponent: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      num: '',
      message: ''
    }
  });

  const onSubmit = (data: FormData) => {
    console.log(data); 
  };

  return (
    <div className='w-full h-screen'>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto pt-32">
      <div className="mb-4">
        <label htmlFor="name" className="block mb-1">Nom</label>
        <input type="text" id="name" {...register('name')} className="w-full border border-gray-300 rounded px-3 py-2" />
        {errors.name && <span className="text-red-500">Ce champ est requis</span>}
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block mb-1">Email</label>
        <input type="email" id="email" {...register('email')} className="w-full border border-gray-300 rounded px-3 py-2" />
        {errors.email && <span className="text-red-500">Email invalide</span>}
      </div>
      <div className="mb-4">
        <label htmlFor="num" className="block mb-1">Numéro</label>
        <input type="tel" id="num" {...register('num')} className="w-full border border-gray-300 rounded px-3 py-2" />
        {errors.num && <span className="text-red-500">Le numéro doit comporter au moins 10 caractères</span>}
      </div>
      <div className="mb-4">
        <label htmlFor="message" className="block mb-1">Message</label>
        <textarea id="message" {...register('message')} className="w-full border border-gray-300 rounded px-3 py-2"></textarea>
        {errors.message && <span className="text-red-500">Ce champ est requis</span>}
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Envoyer</button>
    </form>
    </div>
  );
};

export default FormComponent;
