'use client';

import { FieldError, UseFormRegister } from 'react-hook-form'
import AlertWrapper from '@/components/ui/AlertWrapper'
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field'
import { Textarea } from '@/components/ui/textarea'

interface IProps {
    name: string
    label: string
    placeholder?: string
    description?: string
    register: UseFormRegister<any>
    error?: FieldError
    defaultValue?: string | number | readonly string[] | undefined
    className?: string
    rows?: number
    maxLength?: number
    disabled?: boolean
}

const FormTextarea = ({
    name,
    label,
    placeholder,
    description,
    register,
    error,
    defaultValue,
    className,
    rows,
    disabled
}: IProps) => {
    return (
        <Field>
            <FieldLabel htmlFor={name}>{label}</FieldLabel>
            <Textarea
                disabled={disabled}
                {...register(name)}
                id={name}
                placeholder={placeholder}
                defaultValue={defaultValue}
                className={`min-h-32 resize-none ${className || ''}`}
                rows={rows}
            />

            {description && (
                <FieldDescription>{description}</FieldDescription>
            )}

            {error && <AlertWrapper errText={String(error.message)} />}
        </Field>
    )
}

export default FormTextarea