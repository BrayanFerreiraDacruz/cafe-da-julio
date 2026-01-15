import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLocation } from "wouter";
import { getLoginUrl } from "@/const";
import { Coffee, Leaf, MapPin, ShoppingCart, LogOut, LogIn, Settings } from "lucide-react";

/**
 * Home page - Landing page and main navigation hub for Café da Júlio
 * Features café introduction, navigation to all main sections, and user authentication
 */
export default function Home() {
  const { user, loading, isAuthenticated, logout } = useAuth();
  const [, setLocation] = useLocation();

  const handleLogout = async () => {
    await logout();
  };

  const handleLoginClick = () => {
    window.location.href = getLoginUrl();
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur border-b border-border shadow-md">
        <div className="container flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center gap-3 cursor-pointer hover:opacity-90 transition-opacity" onClick={() => setLocation("/")}>
            <img src="/logo.png" alt="Café da Júlio" className="w-10 h-10 rounded-full shadow-md" />
            <div>
              <h1 className="text-lg font-bold text-foreground">Café da Júlio</h1>
              <p className="text-xs text-muted-foreground">Farroupilha</p>
            </div>
          </div>

          {/* Main Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLocation("/pedidos")}
              className="text-foreground hover:text-primary"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Pedidos
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLocation("/doppio")}
              className="text-foreground hover:text-primary"
            >
              <Coffee className="w-4 h-4 mr-2" />
              Doppio Vermelho
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLocation("/marmitas")}
              className="text-foreground hover:text-primary"
            >
              <Leaf className="w-4 h-4 mr-2" />
              Marmitas Fit
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLocation("/localizacao")}
              className="text-foreground hover:text-primary"
            >
              <MapPin className="w-4 h-4 mr-2" />
              Localização
            </Button>
          </nav>

          {/* User Section */}
          <div className="flex items-center gap-2">
            {loading ? (
              <div className="w-8 h-8 bg-muted rounded-full animate-pulse" />
            ) : isAuthenticated && user?.role === "admin" ? (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setLocation("/admin")}
                  className="hidden sm:flex"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Admin
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-foreground hover:text-destructive"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </>
            ) : (
              <Button
                variant="default"
                size="sm"
                onClick={handleLoginClick}
              >
                <LogIn className="w-4 h-4 mr-2" />
                Login Admin
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container max-w-4xl">
          <div className="text-center space-y-6">
            <div className="inline-block">
              <div className="w-24 h-24 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                <Coffee className="w-12 h-12 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Bem-vindo ao Café da Júlio
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Localizado no coração de Farroupilha, oferecemos café de qualidade, marmitas fit deliciosas e um ambiente acolhedor para você desfrutar.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
              <Button
                size="lg"
                onClick={() => setLocation("/pedidos")}
                className="bg-primary hover:bg-primary/90"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Fazer Pedido
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => setLocation("/localizacao")}
              >
                <MapPin className="w-5 h-5 mr-2" />
                Nos Encontre
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 md:py-24">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            O que oferecemos
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Pedidos Card */}
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer group" onClick={() => setLocation("/pedidos")}>
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors mb-4">
                <ShoppingCart className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Pedidos Personalizados</h3>
              <p className="text-muted-foreground">
                Escolha entre nossos itens do dia, salgados, doces e marmitas fit. Receba seu pedido via WhatsApp.
              </p>
            </Card>

            {/* Marmitas Card */}
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer group" onClick={() => setLocation("/marmitas")}>
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors mb-4">
                <Leaf className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Marmitas Fit</h3>
              <p className="text-muted-foreground">
                Refeições saudáveis e saborosas com opções de frango, carne e sopas. Perfeito para seu estilo de vida.
              </p>
            </Card>

            {/* Café Card */}
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer group" onClick={() => setLocation("/doppio")}>
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-secondary/10 group-hover:bg-secondary/20 transition-colors mb-4">
                <Coffee className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Doppio Vermelho</h3>
              <p className="text-muted-foreground">
                Nosso café especial com grãos selecionados. Qualidade premium em cada xícara.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Location Preview Section */}
      <section className="py-16 md:py-24 bg-secondary/5">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-foreground">
                Visite-nos em Farroupilha
              </h2>
              <p className="text-muted-foreground mb-4 text-lg">
                Localizado no coração de Farroupilha, o Café da Júlio é o lugar perfeito para desfrutar de um café de qualidade, marmitas fit e um ambiente acolhedor.
              </p>
              <p className="text-muted-foreground mb-6">
                Aberto todos os dias para servir você com o melhor café e comida saudável da região.
              </p>
              <Button
                size="lg"
                onClick={() => setLocation("/localizacao")}
                variant="default"
              >
                <MapPin className="w-5 h-5 mr-2" />
                Ver Localização
              </Button>
            </div>
            <div className="bg-muted rounded-lg h-64 flex items-center justify-center border-2 border-dashed border-border">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">Mapa interativo</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-border">
        <div className="container flex justify-around py-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLocation("/")}
            className="flex-1 flex flex-col items-center gap-1"
          >
            <Coffee className="w-5 h-5" />
            <span className="text-xs">Home</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLocation("/pedidos")}
            className="flex-1 flex flex-col items-center gap-1"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="text-xs">Pedidos</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLocation("/marmitas")}
            className="flex-1 flex flex-col items-center gap-1"
          >
            <Leaf className="w-5 h-5" />
            <span className="text-xs">Fit</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLocation("/localizacao")}
            className="flex-1 flex flex-col items-center gap-1"
          >
            <MapPin className="w-5 h-5" />
            <span className="text-xs">Local</span>
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 md:mt-24 pt-12 pb-24 md:pb-12 border-t border-border bg-muted/30">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="font-semibold text-foreground mb-4">Café da Júlio</h4>
              <p className="text-sm text-muted-foreground">
                Qualidade, sabor e acolhimento em cada xícara e refeição.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Horário</h4>
              <p className="text-sm text-muted-foreground">
                Segunda a Sexta: 7h - 18h<br />
                Sábado: 8h - 14h<br />
                Domingo: Fechado
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Contato</h4>
              <p className="text-sm text-muted-foreground">
                WhatsApp: (54) 99999-9999<br />
                Email: contato@cafedalulio.com.br
              </p>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Café da Júlio. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
