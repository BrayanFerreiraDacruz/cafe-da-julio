import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Coffee, ArrowLeft, Star, Leaf, Droplet } from "lucide-react";
import { useLocation } from "wouter";

/**
 * Doppio Vermelho page - Premium coffee section
 * Showcases the café's signature coffee blend with details about quality and origin
 */
export default function DoppioVermelho() {
  const [, setLocation] = useLocation();

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
          <h1 className="text-xl font-bold text-primary">Doppio Vermelho</h1>
          <div className="w-10" />
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/10 via-background to-secondary/5">
        <div className="container max-w-4xl">
          <div className="text-center space-y-6">
            <div className="inline-block">
              <div className="w-32 h-32 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
                <Coffee className="w-16 h-16 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Doppio Vermelho
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Nosso café especial com grãos selecionados. Qualidade premium em cada xícara.
            </p>
            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-5 h-5 fill-primary text-primary" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-24">
        <div className="container max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-foreground">
                A História do Doppio Vermelho
              </h2>
              <p className="text-muted-foreground mb-4 text-lg">
                O Doppio Vermelho é resultado de anos de pesquisa e dedicação para trazer o melhor café para Farroupilha. Cada grão é cuidadosamente selecionado de fazendas parceiras que compartilham nossos valores de qualidade e sustentabilidade.
              </p>
              <p className="text-muted-foreground mb-4 text-lg">
                Com um blend único de grãos arábica e robusta, o Doppio Vermelho oferece um sabor equilibrado, com notas de chocolate, caramelo e um toque de acidez agradável que complementa perfeitamente o aroma intenso.
              </p>
              <p className="text-muted-foreground text-lg">
                Torrado em pequenos lotes para garantir frescor máximo, cada xícara é uma experiência completa que reflete nossa paixão pelo café.
              </p>
            </div>
            <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg h-80 flex items-center justify-center border-2 border-primary/20">
              <div className="text-center">
                <Coffee className="w-24 h-24 text-primary mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground">Imagem do café</p>
              </div>
            </div>
          </div>

          {/* Characteristics */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-foreground text-center">
              Características
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
                  <Leaf className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">Origem</h3>
                <p className="text-muted-foreground">
                  Grãos selecionados de fazendas certificadas com práticas sustentáveis e éticas.
                </p>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-accent/10 mb-4">
                  <Star className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">Sabor</h3>
                <p className="text-muted-foreground">
                  Notas de chocolate, caramelo e um toque de acidez agradável. Aroma intenso e envolvente.
                </p>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-secondary/10 mb-4">
                  <Droplet className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">Preparo</h3>
                <p className="text-muted-foreground">
                  Torrado em pequenos lotes para máxima frescor. Ideal para espresso, coado ou prensa francesa.
                </p>
              </Card>
            </div>
          </div>

          {/* Tasting Notes */}
          <div className="bg-muted/30 rounded-lg p-8 mb-16 border border-border">
            <h2 className="text-2xl font-bold mb-6 text-foreground">
              Notas de Degustação
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-foreground mb-4">Aroma</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full" />
                    Intenso e envolvente
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full" />
                    Notas de chocolate amargo
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full" />
                    Toque de especiarias
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-4">Sabor</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full" />
                    Chocolate e caramelo
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full" />
                    Acidez equilibrada
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full" />
                    Corpo encorpado
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* How to Enjoy */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-foreground">
              Como Apreciar
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6">
                <div className="text-3xl font-bold text-primary mb-3">01</div>
                <h3 className="font-semibold text-foreground mb-2">Escolha o Preparo</h3>
                <p className="text-sm text-muted-foreground">
                  Espresso, coado, prensa francesa ou sua forma preferida de preparar café.
                </p>
              </Card>

              <Card className="p-6">
                <div className="text-3xl font-bold text-primary mb-3">02</div>
                <h3 className="font-semibold text-foreground mb-2">Aprecie o Aroma</h3>
                <p className="text-sm text-muted-foreground">
                  Respire profundamente e desfrute das notas aromáticas do café fresco.
                </p>
              </Card>

              <Card className="p-6">
                <div className="text-3xl font-bold text-primary mb-3">03</div>
                <h3 className="font-semibold text-foreground mb-2">Sinta o Sabor</h3>
                <p className="text-sm text-muted-foreground">
                  Deixe o café permanecer na boca por alguns segundos para sentir todas as notas.
                </p>
              </Card>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center py-12 bg-primary/5 rounded-lg border border-primary/20">
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              Pronto para experimentar?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Visite o Café da Júlio e desfrute de uma xícara perfeita de Doppio Vermelho preparada por nossas baristas experientes.
            </p>
            <Button
              size="lg"
              onClick={() => setLocation("/pedidos")}
              className="bg-primary hover:bg-primary/90"
            >
              <Coffee className="w-5 h-5 mr-2" />
              Fazer Pedido
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-16 pt-12 pb-8 border-t border-border bg-muted/30">
        <div className="container text-center text-sm text-muted-foreground">
          <p>&copy; 2024 Café da Júlio - Doppio Vermelho. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
