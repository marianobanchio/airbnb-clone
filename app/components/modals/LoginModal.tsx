'use client';

import axios from 'axios';
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from 'react';
import {
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form';

import useLoginModal from '@/app/hooks/useLoginModal';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import { toast } from 'react-hot-toast';
import Button from '../Button';

const LoginModal = () => {
    
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);
    
    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name:'',
            email: '',
            password: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        axios.post('/api/register', data)
            .then(() => {
                loginModal.onClose();
            }).catch((error) => {
                toast.error('Ocurrió un error al enviar el formulario.');
            }).finally(() => {
                setIsLoading(false);
            })
    }


    const bodyContent = (
        <div className='flex flex-col gap-4'> Login
            <Heading title="Nueva cuenta" subtitle="Registrate, es gratis!"/>
            <Input
                id="email"
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="name"
                label="Name"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="password"
                type="password"
                label="Password"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    )

    const footerContent = (
        <div className='flex flex-col gap-4 mt-3 w-100 md:items-center'>
            <hr />
            <div className='md:w-[350px]'>

                <Button 
                    outline 
                    label="Continue with Google"
                    icon={FcGoogle}
                    onClick={() => {}}
                />
                <Button 
                    outline 
                    label="Continue with GitHub"
                    icon={AiFillGithub}
                    onClick={() => {}}
                />
            </div>

            <div className='text-center flex flex-row items-center gap-2'>
                <div>Already have an account?</div>
                <div 
                    onClick={loginModal.onClose}
                    className='text-neutral-800 cursor-pointer hover:underline'>
                    Log in
                </div>
            </div>
        </div>
    );

    return ( 
        <Modal
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title="Register"
            actionLabel="Continue"
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
     );
}
 
export default LoginModal;