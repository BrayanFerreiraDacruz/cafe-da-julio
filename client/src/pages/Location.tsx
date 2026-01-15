import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Phone, Clock, ArrowLeft, Image as ImageIcon } from "lucide-react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";

/**
 * Location page - Displays café location on Google Maps and photo gallery
 * Shows address, hours, contact info and future photo gallery section
 */
export default function Location() {
  const [, setLocation] = useLocation();
  const { data: galleryPhotos = [] } = trpc.gallery.getAll.useQuery();

  const handleDirections = () => {
    // Coordinates for Rua Julio de Castilhos, Centro, Farroupilha
    const latitude = -29.2095;
    const longitude = -51.1952;
    const mapsUrl = `https://www.google.com/maps/search/Caf%C3%A9+da+J%C3%BAlio+Rua+J%C3%BAlio+de+Castilhos/@${latitude},${longitude},15z`;
    window.open(mapsUrl, "_blank");
  };

  const handleWhatsApp = () => {
    const message = "Olá! Gostaria de mais informações sobre o Café da Júlio.";
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/5554996027120?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card/95 backdrop-blur border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLocation("/")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <h1 className="text-xl font-bold text-primary">Localização</h1>
          <div className="w-10" />
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-primary/10 via-background to-secondary/5">
        <div className="container">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Visite-nos em Farroupilha
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Localizado no coração de Farroupilha, o Café da Júlio está pronto para recebê-lo com qualidade e acolhimento.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Endereço</h3>
                    <p className="text-sm text-muted-foreground">
                      Rua Júlio de Castilhos, Centro<br />
                      Farroupilha, RS<br />
                      CEP: 95180-000
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-accent/10 rounded-lg">
                    <Clock className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Horário</h3>
                    <p className="text-sm text-muted-foreground">
                      Seg-Sex: 7h - 18h<br />
                      Sábado: 8h - 14h<br />
                      Domingo: Fechado
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-secondary/10 rounded-lg">
                    <Phone className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Contato</h3>
                    <p className="text-sm text-muted-foreground">
                      WhatsApp: (54) 99999-9999<br />
                      Email: contato@cafedalulio.com.br
                    </p>
                  </div>
                </div>
              </Card>

              <div className="space-y-3">
                <Button
                  onClick={handleDirections}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Ver no Google Maps
                </Button>
                <Button
                  onClick={handleWhatsApp}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Enviar WhatsApp
                </Button>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="lg:col-span-2">
              <Card className="h-96 flex items-center justify-center border-2 border-dashed border-border bg-muted/20">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <p className="text-muted-foreground font-medium">
                    Mapa interativo do Google Maps
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Clique em "Ver no Google Maps" para abrir a localização completa
                  </p>
                </div>
              </Card>
            </div>
          </div>

          {/* Photo Gallery Section */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold mb-4 text-foreground">
              Galeria de Fotos
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl">
              Conheça melhor o ambiente acolhedor do Café da Júlio através de nossas fotos. Em breve, mais imagens do interior, exterior e de nossos clientes satisfeitos.
            </p>

            {galleryPhotos.length === 0 ? (
              <div className="grid md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="h-64 flex items-center justify-center border-2 border-dashed border-border bg-muted/20">
                    <div className="text-center">
                      <ImageIcon className="w-12 h-12 text-muted-foreground mx-auto mb-2 opacity-50" />
                      <p className="text-sm text-muted-foreground">
                        Espaço para foto
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-6">
                {galleryPhotos.map((photo) => (
                  <Card key={photo.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="h-64 bg-muted flex items-center justify-center">
                      <img
                        src={photo.imageUrl}
                        alt={photo.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-foreground">{photo.title}</h3>
                      {photo.description && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {photo.description}
                        </p>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            )}

            <div className="mt-8 p-6 bg-accent/10 border border-accent/20 rounded-lg">
              <p className="text-sm text-foreground">
                <strong>Dica:</strong> Visite-nos pessoalmente para experimentar a atmosfera acolhedora do Café da Júlio. Estamos ansiosos para recebê-lo!
              </p>
            </div>
          </div>

          {/* Directions Info */}
          <div className="mt-16 grid md:grid-cols-2 gap-8">
            <Card className="p-8 bg-primary/5 border-primary/20">
              <h3 className="text-xl font-bold mb-4 text-foreground">
                Como Chegar
              </h3>
            <p className="text-muted-foreground mb-4">
              Localizado na Rua Júlio de Castilhos no Centro de Farroupilha, o Café da Júlio está facilmente acessível por carro ou transporte público. Estacionamento disponível nas proximidades.
            </p>
              <Button
                variant="outline"
                onClick={handleDirections}
                className="w-full"
              >
                Obter Direções
              </Button>
            </Card>

            <Card className="p-8 bg-secondary/5 border-secondary/20">
              <h3 className="text-xl font-bold mb-4 text-foreground">
                Próximo a Você
              </h3>
              <p className="text-muted-foreground mb-4">
                Localizamos perto de pontos de referência conhecidos em Farroupilha. Fácil de encontrar e com ambiente acolhedor para você desfrutar de nossos produtos.
              </p>
              <Button
                onClick={handleWhatsApp}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                Enviar Mensagem
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-16 pt-12 pb-8 border-t border-border bg-muted/30">
        <div className="container text-center text-sm text-muted-foreground">
          <p>&copy; 2024 Café da Júlio - Farroupilha. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
