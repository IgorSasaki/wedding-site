import { AlertCircle, Heart, Loader2, RefreshCw, Send } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { FadeSection } from "@/components/animations/FadeSection";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/StaggerContainer";
import { STAGGER_VARIANT_ITEMS } from "@/components/animations/StaggerContainer/data";
import { MessageCard } from "@/components/MessageCard";
import { SectionTitle } from "@/components/SectionTitle";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SITE_CONFIG } from "@/config/siteConfig";
import { useToast } from "@/hooks/useToast";
import { Message, MessagesService } from "@/services/api/MessagesService";
import { zodResolver } from "@hookform/resolvers/zod";

import { MessageFormData, messageSchema } from "./schemas";

export const Messages: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<MessageFormData>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const loadMessages = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await MessagesService.getAll();
      setMessages(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Erro ao carregar mensagens:", err);
      setError("Não foi possível carregar as mensagens. Tente novamente.");
      setMessages([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const onSubmit = async (data: MessageFormData) => {
    setIsSubmitting(true);
    try {
      const newMessage = await MessagesService.create({
        name: data.name,
        email: data.email || undefined,
        message: data.message,
      });

      if (newMessage && typeof newMessage === "object") {
        setMessages((prev) => [newMessage, ...prev]);
      }
      form.reset();

      toast({
        title: "Mensagem enviada! 💙",
        description:
          "Obrigado pelo carinho! Sua mensagem significa muito para nós.",
      });
    } catch (err) {
      console.error("Erro ao enviar mensagem:", err);

      toast({
        title: "Erro ao enviar",
        description: "Não foi possível enviar sua mensagem. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const messageCount = Array.isArray(messages) ? messages.length : 0;

  return (
    <section className="section" id="mensagens">
      <div className="section-container">
        <FadeSection>
          <SectionTitle
            subtitle={SITE_CONFIG.messages.subtitle}
            title={SITE_CONFIG.messages.title}
          />
        </FadeSection>

        <div className="max-w-4xl mx-auto">
          <FadeSection delay={0.2} direction="up">
            <div className="watercolor-card p-6 md:p-8 mb-12">
              <Form {...form}>
                <form
                  className="space-y-6"
                  onSubmit={form.handleSubmit(onSubmit)}
                >
                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormField
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Seu Nome *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Como você se chama?"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                      control={form.control}
                      name="name"
                    />
                    <FormField
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>E-mail (opcional)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="seu@email.com"
                              type="email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                      control={form.control}
                      name="email"
                    />
                  </div>
                  <FormField
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sua Mensagem *</FormLabel>
                        <FormControl>
                          <Textarea
                            className="min-h-[120px] resize-none"
                            placeholder={SITE_CONFIG.messages.placeholder}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                    control={form.control}
                    name="message"
                  />
                  <div className="flex justify-end">
                    <Button
                      className="btn-wedding"
                      disabled={isSubmitting}
                      type="submit"
                    >
                      {isSubmitting ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                      Enviar Mensagem
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </FadeSection>

          <FadeSection delay={0.3}>
            <div className="flex items-center gap-2 mb-6">
              <Heart className="w-5 h-5 text-secondary" />
              <h3 className="font-serif text-xl text-primary">
                Mural de Mensagens ({messageCount})
              </h3>
            </div>

            {isLoading && (
              <div className="text-center py-12">
                <Loader2 className="w-10 h-10 animate-spin text-secondary mx-auto mb-4" />
                <p className="text-muted-foreground">Carregando mensagens...</p>
              </div>
            )}

            {!isLoading && error && (
              <div className="text-center py-12">
                <div className="watercolor-card max-w-md mx-auto p-6">
                  <AlertCircle className="w-10 h-10 text-destructive mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">{error}</p>
                  <Button
                    className="gap-2"
                    onClick={loadMessages}
                    variant="outline"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Tentar novamente
                  </Button>
                </div>
              </div>
            )}

            {!isLoading && !error && messageCount === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <Heart className="w-12 h-12 mx-auto mb-4 opacity-30" />
                <p>Seja o primeiro a deixar uma mensagem!</p>
              </div>
            )}

            {!isLoading && !error && messageCount > 0 && (
              <StaggerContainer className="grid gap-4" staggerDelay={0.1}>
                {messages.map((msg) => (
                  <StaggerItem key={msg.id} variants={STAGGER_VARIANT_ITEMS}>
                    <MessageCard
                      date={MessagesService.formatDate(msg.dateTime)}
                      message={msg.message}
                      name={msg.name}
                    />
                  </StaggerItem>
                ))}
              </StaggerContainer>
            )}
          </FadeSection>
        </div>
      </div>
    </section>
  );
};
