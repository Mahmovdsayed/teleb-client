'use client';

import { Field, FieldGroup } from "@/components/ui/field";
import { MessaeginitialState } from "@/constant/initial-values";
import { ConfettiFireworks } from "@/functions/ConfettiFireworks";
import { useFormHandler } from "@/hooks/useFormHandler";
import { sendMessage } from "@/services/contact";
import { CreateMessageInput, createMessageSchema } from "@/validations/Message.validation";
import { useLocale, useTranslations } from "next-intl";
import FormField from "../FormField";
import FormTextarea from "../FormTextarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

const ContactUsForm = () => {
    const t = useTranslations("contact");
    const locale = useLocale();

    const { register, onSubmit, loading, reset, formState: { errors, isValid } } = useFormHandler<CreateMessageInput>({
        schema: createMessageSchema,
        defaultValues: MessaeginitialState,
        service: (data: CreateMessageInput) => sendMessage(data, locale),
        onSuccess: () => {
            reset();
            ConfettiFireworks();
        }
    })

    return <>
        <form onSubmit={onSubmit}>
            <FieldGroup>
                <FormField
                    type="text"
                    name="fullName"
                    register={register}
                    error={errors.fullName}
                    label={t("name")}
                    placeholder={t('namePlaceholder')}
                    description={t("nameDescription")}
                    disabled={loading}
                />
                <div className="grid grid-cols-2 gap-2">
                    <FormField
                        type="text"
                        name="email"
                        register={register}
                        error={errors.email}
                        label={t("email")}
                        placeholder={t('emailPlaceholder')}
                        description={t("emailDescription")}
                        disabled={loading}
                    />
                    <FormField
                        type="text"
                        name="phone"
                        register={register}
                        error={errors.phone}
                        label={t("phone")}
                        placeholder={t('phonePlaceholder')}
                        description={t("phoneDescription")}
                        disabled={loading}
                    />
                </div>
                <FormField
                    type="text"
                    name="subject"
                    register={register}
                    error={errors.subject}
                    label={t("subject")}
                    placeholder={t('subjectPlaceholder')}
                    description={t("subjectDescription")}
                    disabled={loading}
                />
                <FormTextarea
                    name="message"
                    register={register}
                    error={errors.message}
                    label={t("message")}
                    placeholder={t('messagePlaceholder')}
                    description={t("messageDescription")}
                    disabled={loading}
                />
                <Field>
                    <Button
                        disabled={loading || !isValid}
                        type="submit"
                        size={"lg"}
                        className={"rounded-2xl"}
                    >
                        {loading ? <Spinner /> : <Send />}
                        {t("send")}
                    </Button>
                </Field>
            </FieldGroup>
        </form>
    </>;
};

export default ContactUsForm;