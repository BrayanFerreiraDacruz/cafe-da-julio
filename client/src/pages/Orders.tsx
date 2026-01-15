import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingCart, Plus, Minus, Trash2, Send, ArrowLeft } from "lucide-react";
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
 * Orders page - Main ordering interface with categories and shopping cart
 * Users can select items from daily, salgados, doces and send order via WhatsApp
 */
export default function Orders() {
  const [, setLocation] = useLocation();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedTab, setSelectedTab] = useState("daily");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [showCheckout, setShowCheckout] = useState(false);

  // Fetch menu items by category
  const { data: dailyItems = [] } = trpc.menu.getAvailableByCategory.useQuery({ category: "daily" });
  const { data: salgadosItems = [] } = trpc.menu.getAvailableByCategory.useQuery({ category: "salgados" });
  const { data: docesItems = [] } = trpc.menu.getAvailableByCategory.useQuery({ category: "doces" });

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
    toast.success(`${item.name} adicionado ao carrinho!`);
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  };

  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSendToWhatsApp = () => {
    if (!customerName.trim()) {
      toast.error("Por favor, insira seu nome");
      return;
    }
    if (!customerPhone.trim()) {
      toast.error("Por favor, insira seu telefone");
      return;
    }
    if (cart.length === 0) {
      toast.error("Seu carrinho está vazio");
      return;
    }

    // Format cart items for WhatsApp message
    let message = `*Novo Pedido - Café da Júlio*\n\n`;
    message += `*Cliente:* ${customerName}\n`;
    message += `*Telefone:* ${customerPhone}\n\n`;
    message += `*Itens do Pedido:*\n`;

    cart.forEach((item) => {
      message += `• ${item.name} x${item.quantity} - R$ ${(item.price * item.quantity).toFixed(2)}\n`;
    });

    message += `\n*Total:* R$ ${totalPrice.toFixed(2)}\n\n`;
    message += `*Retirada:* Café da Júlio - Farroupilha\n`;
    message += `*Observações:* Pedido realizado via site`;

    // Encode message for WhatsApp
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/5554996027120?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
    toast.success("Redirecionando para WhatsApp...");
  };

  const MenuItem = ({ item }: { item: any }) => (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-foreground">{item.name}</h3>
          {item.description && (
            <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
          )}
        </div>
        <span className="text-lg font-bold text-primary ml-2">
          R$ {parseFloat(item.price).toFixed(2)}
        </span>
      </div>
      <Button
        size="sm"
        onClick={() => addToCart(item)}
        className="w-full bg-primary hover:bg-primary/90"
      >
        <Plus className="w-4 h-4 mr-2" />
        Adicionar
      </Button>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
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
          <h1 className="text-xl font-bold text-primary">Fazer Pedido</h1>
          <div className="w-10 text-right">
            {cart.length > 0 && (
              <span className="text-sm font-semibold text-primary">
                {cart.length}
              </span>
            )}
          </div>
        </div>
      </header>

      <div className="container py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Menu Section */}
          <div className="lg:col-span-2">
            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="daily">Disponíveis do Dia</TabsTrigger>
                <TabsTrigger value="salgados">Salgados</TabsTrigger>
                <TabsTrigger value="doces">Doces</TabsTrigger>
              </TabsList>

              <TabsContent value="daily" className="space-y-4">
                {dailyItems.length === 0 ? (
                  <Card className="p-8 text-center">
                    <p className="text-muted-foreground">
                      Nenhum item disponível no momento
                    </p>
                  </Card>
                ) : (
                  <div className="grid md:grid-cols-2 gap-4">
                    {dailyItems.map((item) => (
                      <MenuItem key={item.id} item={item} />
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="salgados" className="space-y-4">
                {salgadosItems.length === 0 ? (
                  <Card className="p-8 text-center">
                    <p className="text-muted-foreground">
                      Nenhum salgado disponível no momento
                    </p>
                  </Card>
                ) : (
                  <div className="grid md:grid-cols-2 gap-4">
                    {salgadosItems.map((item) => (
                      <MenuItem key={item.id} item={item} />
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="doces" className="space-y-4">
                {docesItems.length === 0 ? (
                  <Card className="p-8 text-center">
                    <p className="text-muted-foreground">
                      Nenhum doce disponível no momento
                    </p>
                  </Card>
                ) : (
                  <div className="grid md:grid-cols-2 gap-4">
                    {docesItems.map((item) => (
                      <MenuItem key={item.id} item={item} />
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>

          {/* Cart Section */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-20">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <ShoppingCart className="w-5 h-5 mr-2 text-primary" />
                Carrinho
              </h2>

              {cart.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  Seu carrinho está vazio
                </p>
              ) : (
                <>
                  <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                      >
                        <div className="flex-1">
                          <p className="font-medium text-sm text-foreground">
                            {item.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            R$ {item.price.toFixed(2)}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="h-6 w-6 p-0"
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="w-6 text-center text-sm font-semibold">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="h-6 w-6 p-0"
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromCart(item.id)}
                            className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-border pt-4 mb-6">
                    <div className="flex justify-between mb-2">
                      <span className="text-muted-foreground">Subtotal:</span>
                      <span className="font-semibold">R$ {totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold text-primary">
                      <span>Total:</span>
                      <span>R$ {totalPrice.toFixed(2)}</span>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowCheckout(!showCheckout)}
                    className="w-full mb-4"
                  >
                    {showCheckout ? "Ocultar Dados" : "Finalizar Pedido"}
                  </Button>

                  {showCheckout && (
                    <div className="space-y-3 p-4 bg-muted/30 rounded-lg border border-border">
                      <div>
                        <Label htmlFor="name" className="text-sm">
                          Seu Nome
                        </Label>
                        <Input
                          id="name"
                          placeholder="João Silva"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone" className="text-sm">
                          WhatsApp
                        </Label>
                        <Input
                          id="phone"
                          placeholder="(54) 99999-9999"
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div className="bg-accent/10 p-3 rounded text-xs text-foreground border border-accent/20">
                        <p className="font-semibold mb-1">📍 Retirada</p>
                        <p>Café da Júlio - Farroupilha</p>
                      </div>
                      <Button
                        onClick={handleSendToWhatsApp}
                        className="w-full bg-green-600 hover:bg-green-700 text-white"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Enviar via WhatsApp
                      </Button>
                    </div>
                  )}
                </>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
