import { SectionTitle } from "@/components/SectionTitle"
import { Card, CardContent } from "@/components/ui/card"
import { SITE_CONFIG } from "@/config/siteConfig"
import { MessageCircle, Phone } from "lucide-react"

export const ReserveConfirm = () => {
  return (

    <section id="rsvp" className="section gradient-bg">
      <div className="section-container">
        <SectionTitle
          title={SITE_CONFIG.rsvp.title}
          subtitle="Queremos muito contar com sua presença"
        />

        <div className="max-w-2xl mx-auto">
          <Card className="watercolor-card text-center">
            <CardContent className="pt-8 pb-8">
              <div className="w-16 h-16 mx-auto rounded-full bg-secondary/10 flex items-center justify-center mb-6">
                <Phone className="w-8 h-8 text-secondary" />
              </div>

              <p className="text-lg text-foreground leading-relaxed mb-6">
                {SITE_CONFIG.rsvp.message}
              </p>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary">
                <MessageCircle className="w-4 h-4" />
                <span className="font-medium">{SITE_CONFIG.rsvp.contactName}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}