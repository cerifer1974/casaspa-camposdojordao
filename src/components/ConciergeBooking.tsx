import { useState } from "react";
import { format, differenceInDays } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { DateRange } from "react-day-picker";
import {
  Calendar as CalendarIcon,
  Check,
  ChevronRight,
  Heart,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  UtensilsCrossed,
  Wine,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createWhatsAppUrl } from "@/lib/contact";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const AIRBNB_URL = "https://www.airbnb.com.br/rooms/1200082710154180175?viralityEntryPoint=1&unique_share_id=AB039912-DA27-4263-9BA0-0DF3329B51FD&slcid=cc5bcae75c7a429f9a8ed546ce62d013&s=76&adults=2&slug=B3rS1cDg&source_impression_id=p3_1790001515_P39FxlTwX9Rkfo82&check_in=2026-10-16&guests=2&check_out=2026-10-18";

const OCCASIONS = [
  { value: "escapada", label: "Escapada Romântica a Dois" },
  { value: "lua-de-mel", label: "Lua de Mel" },
  { value: "aniversario", label: "Aniversário / Celebração Especial" },
  { value: "bem-estar", label: "Desconexão & Ritual de Bem-Estar" },
  { value: "outra", label: "Outro Motivo Especial" },
];

const EXPERIENCES = [
  { id: "spa", label: "Massoterapia & Ritual de Spa in-house", icon: Sparkles },
  { id: "chef", label: "Jantar Romântico com Chef Privativo", icon: UtensilsCrossed },
  { id: "champagne", label: "Recepção com Champagne & Boas-Vindas", icon: Wine },
  { id: "mantiqueira", label: "Cesta Gourmet com Produtores Locais", icon: Heart },
];

interface ConciergeBookingProps {
  className?: string;
  variant?: "full" | "compact";
}

export function ConciergeBooking({ className, variant = "full" }: ConciergeBookingProps) {
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [occasion, setOccasion] = useState<string>("escapada");
  const [selectedExperiences, setSelectedExperiences] = useState<string[]>([]);
  const [specialRequest, setSpecialRequest] = useState<string>("");
  const [calendarOpen, setCalendarOpen] = useState(false);

  const nights =
    dateRange?.from && dateRange?.to
      ? differenceInDays(dateRange.to, dateRange.from)
      : 0;

  const toggleExperience = (id: string) => {
    setSelectedExperiences((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleWhatsAppBooking = () => {
    let message = "Olá, Concierge da Casa Spa Campos do Jordão! 🌿\n\n";
    message += "Gostaria de verificar a disponibilidade para nossa estadia exclusiva:\n\n";

    if (dateRange?.from) {
      const fromFormatted = format(dateRange.from, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
      if (dateRange?.to) {
        const toFormatted = format(dateRange.to, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
        message += `📅 Período: ${fromFormatted} até ${toFormatted} (${nights} ${nights === 1 ? "diária" : "diárias"})\n`;
      } else {
        message += `📅 Data de interesse (entrada): ${fromFormatted}\n`;
      }
    } else {
      message += "📅 Período: [A definir com o Concierge]\n";
    }

    const occasionLabel = OCCASIONS.find((o) => o.value === occasion)?.label;
    if (occasionLabel) {
      message += `🥂 Ocasião: ${occasionLabel}\n`;
    }

    if (selectedExperiences.length > 0) {
      const expLabels = selectedExperiences
        .map((id) => EXPERIENCES.find((e) => e.id === id)?.label)
        .filter(Boolean)
        .join(", ");
      message += `✨ Curadoria de Experiências: ${expLabels}\n`;
    }

    if (specialRequest.trim()) {
      message += `📝 Preferências especiais: ${specialRequest.trim()}\n`;
    }

    message += "\nVi o refúgio pelo site oficial e gostaria de consultar as condições para reserva direta.";

    window.open(createWhatsAppUrl(message), "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className={cn(
        "relative rounded-sm border border-border/60 bg-card/95 text-card-foreground p-6 backdrop-blur-md transition-all shadow-2xl sm:p-8 lg:p-10",
        className
      )}
    >
      {/* Header do Concierge */}
      <div className="flex flex-col gap-2 border-b border-border/50 pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="text-[0.65rem] font-medium uppercase tracking-[0.26em] text-accent-strong">
            Atendimento Privativo
          </span>
          <h3 className="mt-1 font-display text-2xl text-foreground sm:text-3xl">
            Concierge de Reservas Diretas
          </h3>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="h-4 w-4 text-accent-strong" />
          <span>Melhor tarifa & flexibilidade garantidas</span>
        </div>
      </div>

      {/* Grid de Seleção */}
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Seletor de Datas */}
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-[0.16em] text-foreground font-medium">
            Período da Estadia
          </label>
          <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
            <PopoverTrigger asChild>
              <button
                type="button"
                className={cn(
                  "flex h-12 w-full items-center justify-between rounded-none border border-border bg-background px-4 text-left text-sm text-foreground transition-colors hover:border-accent-strong focus:outline-none focus:ring-1 focus:ring-accent-strong",
                  !dateRange && "text-muted-foreground"
                )}
              >
                <div className="flex items-center gap-3 truncate">
                  <CalendarIcon className="h-4 w-4 text-accent-strong shrink-0" />
                  <span className="truncate text-foreground font-normal">
                    {dateRange?.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "dd/MM", { locale: ptBR })} —{" "}
                          {format(dateRange.to, "dd/MM/yyyy", { locale: ptBR })}
                          <span className="ml-2 rounded-sm bg-accent/20 px-1.5 py-0.5 text-[0.7rem] text-accent-strong font-medium">
                            {nights} {nights === 1 ? "noite" : "noites"}
                          </span>
                        </>
                      ) : (
                        format(dateRange.from, "dd/MM/yyyy", { locale: ptBR })
                      )
                    ) : (
                      "Selecione entrada e saída"
                    )}
                  </span>
                </div>
              </button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto p-0 border border-border bg-card text-card-foreground shadow-2xl"
              align="start"
            >
              <div className="p-3 border-b border-border/40 text-xs text-muted-foreground">
                <span className="font-medium text-foreground">Casa Spa</span> · Exclusiva para 2 hóspedes (mín. 2 diárias)
              </div>
              <Calendar
                mode="range"
                defaultMonth={dateRange?.from || new Date()}
                selected={dateRange}
                onSelect={(range) => {
                  setDateRange(range);
                  if (range?.from && range?.to) {
                    setCalendarOpen(false);
                  }
                }}
                numberOfMonths={typeof window !== "undefined" && window.innerWidth < 640 ? 1 : 2}
                disabled={{ before: new Date() }}
                className="p-3"
              />
            </PopoverContent>
          </Popover>
          <p className="text-[0.68rem] text-muted-foreground">
            Tarifas e noites mínimas variam conforme a data selecionada.
          </p>
        </div>

        {/* Ocasião da Viagem */}
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-[0.16em] text-foreground font-medium">
            Ocasião da Estadia
          </label>
          <Select value={occasion} onValueChange={setOccasion}>
            <SelectTrigger className="h-12 rounded-none border border-border bg-background px-4 text-sm text-foreground focus:ring-accent-strong">
              <SelectValue placeholder="Selecione a ocasião">
                {OCCASIONS.find((o) => o.value === occasion)?.label || "Selecione a ocasião"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="border-border bg-card text-card-foreground">
              {OCCASIONS.map((item) => (
                <SelectItem key={item.value} value={item.value} className="text-sm cursor-pointer">
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-[0.68rem] text-muted-foreground">
            Personalizamos a recepção de acordo com a sua comemoração.
          </p>
        </div>

        {/* Informação sobre Hóspedes */}
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-[0.16em] text-foreground font-medium">
            Capacidade & Exclusividade
          </label>
          <div className="flex h-12 items-center justify-between rounded-none border border-border/60 bg-background px-4 text-sm text-muted-foreground">
            <span>Acomodação inteira</span>
            <span className="font-display text-sm text-foreground">2 Adultos (18+)</span>
          </div>
          <p className="text-[0.68rem] text-muted-foreground">
            Ambiente 100% privativo · Não aceita pets.
          </p>
        </div>
      </div>

      {/* Experiências & Curadoria Opcional */}
      {variant === "full" && (
        <div className="mt-8 border-t border-border/50 pt-6">
          <label className="text-xs uppercase tracking-[0.16em] text-foreground font-medium block mb-3">
            Serviços & Experiências Sob Demanda (Opcionais)
          </label>
          <div className="grid gap-3 sm:grid-cols-2">
            {EXPERIENCES.map((exp) => {
              const Icon = exp.icon;
              const isChecked = selectedExperiences.includes(exp.id);
              return (
                <button
                  type="button"
                  key={exp.id}
                  onClick={() => toggleExperience(exp.id)}
                  className={cn(
                    "flex w-full items-center gap-3.5 rounded-none border p-3.5 text-left text-xs transition-all cursor-pointer select-none",
                    isChecked
                      ? "border-accent-strong bg-accent/15 text-foreground ring-1 ring-accent-strong"
                      : "border-border bg-background text-muted-foreground hover:border-accent-strong/60 hover:text-foreground"
                  )}
                >
                  <div
                    className={cn(
                      "flex h-5 w-5 shrink-0 items-center justify-center rounded-sm border transition-colors",
                      isChecked
                        ? "border-accent-strong bg-accent-strong text-accent-foreground"
                        : "border-border bg-background"
                    )}
                  >
                    {isChecked && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                  </div>
                  <Icon className="h-4 w-4 text-accent-strong shrink-0" />
                  <span className="font-medium leading-tight text-foreground">{exp.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Ações de Conversão */}
      <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-border/50 pt-6 md:flex-row">
        <div className="text-center md:text-left">
          <p className="text-xs font-medium text-card-foreground">
            Consulta rápida e sem compromisso
          </p>
          <p className="text-[0.72rem] text-muted-foreground">
            O Concierge confirmará disponibilidade, valores exatos do período e detalhes do check-in.
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Button
            variant="luxury"
            size="luxury"
            onClick={handleWhatsAppBooking}
            className="w-full sm:w-auto shadow-md"
          >
            <MessageCircle className="h-4 w-4" />
            <span>Consultar Disponibilidade com Concierge</span>
          </Button>
          <Button
            variant="luxuryOutline"
            size="luxury"
            asChild
            className="w-full sm:w-auto border-border text-foreground hover:bg-muted"
          >
            <a href={AIRBNB_URL} target="_blank" rel="noreferrer">
              <span>Ver no Airbnb</span>
              <ChevronRight className="h-3 w-3 opacity-60" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
