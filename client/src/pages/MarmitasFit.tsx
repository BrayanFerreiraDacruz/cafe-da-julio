import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingCart, Plus, Leaf, Droplet, ArrowLeft, Check } from "lucide-react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  category: string;
}

/**
 * Marmitas Fit page - Healthy meal options with nature-themed design
 * Features chicken, beef/pork, and soup options with leaf/nature aesthetics
 */
export default function MarmitasFit() {
  const [, setLocation] = useLocation();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedTab, setSelectedTab] = useState("frango");
  const [showCart, setShowCart] = useState(false);

  // Fetch marmita items by category
  const { data: frangoItems = [] } = trpc.menu.getAvailableByCategory.useQuery({ category: "marmitas_frango" });
  const { data: carneItems = [] } = trpc.menu.getAvailableByCategory.useQuery({ category: "marmitas_carne" });
  const { data: sopaItems = [] } = trpc.menu.getAvailableByCategory.useQuery({ category: "sopas" });

  const addToCart = (item: any) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((ci) => ci.id === item.id);
      if (existingItem) {
        return prevCart.map((ci) =>
          ci.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [
        ...prevCart,
        {
          id: item.id,
          name: item.name,
          price: parseFloat(item.price),
          quantity: 1,
          category: item.category,
        },
      ];
    });
    toast.success(`${item.name} adicionado!`);
  };

  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSendToWhatsApp = () => {
    if (cart.length === 0) {
      toast.error("Seu carrinho está vazio");
      return;
    }

    let message = `*Novo Pedido Marmitas Fit - Café da Júlio*\n\n`;
    message += `*Itens:*\n`;

    cart.forEach((item) => {
      message += `• ${item.name} x${item.quantity} - R$ ${(item.price * item.quantity).toFixed(2)}\n`;
    });

    message += `\n*Total:* R$ ${totalPrice.toFixed(2)}\n\n`;
    message += `*Retirada:* Café da Júlio - Farroupilha`;

    const encodedMessage = encodeURIComponent(message);
    const phoneNumbers = ["5554996027120", "5554991371486"];
    const selectedPhone = phoneNumbers[Math.floor(Math.random() * phoneNumbers.length)];
    const whatsappUrl = `https://wa.me/${selectedPhone}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
    toast.success("Redirecionando para WhatsApp...");
  };

  const MarmitaCard = ({ item, icon }: { item: any; icon: React.ReactNode }) => {
    const isInCart = cart.some((ci) => ci.id === item.id);
    const cartItem = cart.find((ci) => ci.id === item.id);

    return (
      <Card className={`p-6 hover:shadow-lg transition-all cursor-pointer border-2 ${
        isInCart ? "border-primary bg-primary/5" : "border-border"
      }`}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-accent/20 rounded-lg">
              {icon}
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-sm">{item.name}</h3>
              {item.description && (
                <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
              )}
            </div>
          </div>
          {isInCart && (
            <div className="bg-primary text-primary-foreground rounded-full p-1">
              <Check className="w-4 h-4" />
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-primary">
            R$ {parseFloat(item.price).toFixed(2)}
          </span>
          {isInCart ? (
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold bg-primary text-primary-foreground px-3 py-1 rounded">
                {cartItem?.quantity}x
              </span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => removeFromCart(item.id)}
              >
                Remover
              </Button>
            </div>
          ) : (
            <Button
              size="sm"
              onClick={() => addToCart(item)}
              className="bg-primary hover:bg-primary/90"
            >
              <Plus className="w-4 h-4" />
            </Button>
          )}
        </div>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Decorative Header with Nature Theme */}
      <div className="relative overflow-hidden bg-gradient-to-br from-accent/10 via-background to-secondary/5 pt-8">
        {/* Leaf decorations */}
        <div className="absolute top-4 right-8 opacity-20">
          <Leaf className="w-16 h-16 text-accent" />
        </div>
        <div className="absolute bottom-4 left-8 opacity-20">
          <Leaf className="w-12 h-12 text-accent rotate-180" />
        </div>

        <div className="container relative z-10 py-12">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLocation("/")}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>

          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Leaf className="w-8 h-8 text-accent" />
              <h1 className="text-4xl font-bold text-foreground">Marmitas Fit</h1>
              <Leaf className="w-8 h-8 text-accent" />
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Refeições saudáveis e saborosas com ingredientes frescos e nutritivos. Perfeito para seu estilo de vida ativo.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Menu Section */}
          <div className="lg:col-span-2">
            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="frango" className="flex items-center gap-2">
                  <Leaf className="w-4 h-4" />
                  Frango
                </TabsTrigger>
                <TabsTrigger value="carne" className="flex items-center gap-2">
                  <Droplet className="w-4 h-4" />
                  Carne Bovina
                </TabsTrigger>
                <TabsTrigger value="sopa" className="flex items-center gap-2">
                  <Droplet className="w-4 h-4" />
                  Sopas
                </TabsTrigger>
              </TabsList>

              {/* Frango Tab */}
              <TabsContent value="frango" className="space-y-4">
                <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <Leaf className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-foreground">Opções com Frango</h3>
                      <p className="text-sm text-muted-foreground">
                        Proteína magra e saudável, combinada com ingredientes frescos e nutritivos.
                      </p>
                    </div>
                  </div>
                </div>

                {frangoItems.length === 0 ? (
                  <Card className="p-8 text-center">
                    <p className="text-muted-foreground">
                      Nenhuma marmita disponível no momento
                    </p>
                  </Card>
                ) : (
                  <div className="grid md:grid-cols-2 gap-4">
                    {frangoItems.map((item) => (
                      <MarmitaCard key={item.id} item={item} icon={<Leaf className="w-5 h-5 text-accent" />} />
                    ))}
                  </div>
                )}
              </TabsContent>

              {/* Carne Tab */}
              <TabsContent value="carne" className="space-y-4">
                <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <Leaf className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-foreground">Opções com Carne Bovina</h3>
                      <p className="text-sm text-muted-foreground">
                        Carnes de qualidade preparadas com técnicas especiais para máximo sabor.
                      </p>
                    </div>
                  </div>
                </div>

                {carneItems.length === 0 ? (
                  <Card className="p-8 text-center">
                    <p className="text-muted-foreground">
                      Nenhuma marmita disponível no momento
                    </p>
                  </Card>
                ) : (
                  <div className="grid md:grid-cols-2 gap-4">
                    {carneItems.map((item) => (
                      <MarmitaCard key={item.id} item={item} icon={<Leaf className="w-5 h-5 text-secondary" />} />
                    ))}
                  </div>
                )}
              </TabsContent>

              {/* Sopa Tab */}
              <TabsContent value="sopa" className="space-y-4">
                <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <Droplet className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-foreground">Sopas Nutritivas</h3>
                      <p className="text-sm text-muted-foreground">
                        Receitas caseiras com ingredientes selecionados, perfeitas para qualquer estação.
                      </p>
                    </div>
                  </div>
                </div>

                {sopaItems.length === 0 ? (
                  <Card className="p-8 text-center">
                    <p className="text-muted-foreground">
                      Nenhuma sopa disponível no momento
                    </p>
                  </Card>
                ) : (
                  <div className="grid md:grid-cols-2 gap-4">
                    {sopaItems.map((item) => (
                      <MarmitaCard key={item.id} item={item} icon={<Droplet className="w-5 h-5 text-primary" />} />
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>

          {/* Cart Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-primary" />
                  Carrinho
                </h2>
                {cart.length > 0 && (
                  <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-full">
                    {cart.length} itens
                  </span>
                )}
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="w-12 h-12 text-muted-foreground/20 mx-auto mb-4" />
                  <p className="text-muted-foreground">Seu carrinho está vazio</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg group">
                        <div className="flex-1">
                          <p className="text-sm font-medium">{item.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {item.quantity}x R$ {item.price.toFixed(2)}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item.id)}
                          className="text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          Remover
                        </Button>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-6">
                      <span className="font-medium">Total</span>
                      <span className="text-2xl font-bold text-primary">
                        R$ {totalPrice.toFixed(2)}
                      </span>
                    </div>

                    <Button
                      onClick={handleSendToWhatsApp}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 text-lg font-bold"
                    >
                      Enviar Pedido
                    </Button>
                    <p className="text-[10px] text-center text-muted-foreground mt-4">
                      Ao clicar, você será redirecionado para o WhatsApp das nossas baristas.
                    </p>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
