import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ArrowLeft, LogOut, AlertCircle, CheckCircle2, Eye, EyeOff } from "lucide-react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { useBaristaAuth } from "@/_core/hooks/useBaristaAuth";
import { toast } from "sonner";

/**
 * Admin Panel page - Barista interface for managing daily menu availability
 * Requires barista email/password login. Allows toggling availability of items by category.
 */
export default function AdminPanel() {
  const [, setLocation] = useLocation();
  const { barista, logout, isAuthenticated, loading, login } = useBaristaAuth();
  const [selectedTab, setSelectedTab] = useState("daily");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Fetch menu items
  const { data: allItems = [] } = trpc.admin.getAllItems.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  const dailyItems = allItems.filter((item) => item.category === "daily");
  const salgadosItems = allItems.filter((item) => item.category === "salgados");
  const docesItems = allItems.filter((item) => item.category === "doces");
  const marmitasItems = allItems.filter((item) => item.category.startsWith("marmitas"));

  // Mutation for updating availability
  const updateAvailability = trpc.admin.updateItemAvailability.useMutation({
    onSuccess: () => {
      toast.success("Disponibilidade atualizada!");
    },
    onError: (error) => {
      toast.error("Erro ao atualizar: " + error.message);
    },
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    try {
      await login(email, password);
      toast.success("Login realizado com sucesso!");
      setEmail("");
      setPassword("");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erro ao fazer login");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logout realizado!");
      setLocation("/");
    } catch (error) {
      toast.error("Erro ao fazer logout");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-muted rounded-full animate-pulse mx-auto mb-4" />
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  // Login form if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#2a1810] to-[#1a0f0a] text-foreground flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-[#3d2817] border-[#8b6f47]">
          <div className="p-8">
            <h1 className="text-2xl font-bold text-center mb-2 text-[#d4a574]">Painel Admin</h1>
            <p className="text-center text-muted-foreground mb-6">Acesso para Baristas</p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-[#d4a574]">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-[#2a1810] border-[#8b6f47] text-foreground"
                  required
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-[#d4a574]">
                  Senha
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-[#2a1810] border-[#8b6f47] text-foreground pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#d4a574] text-[#1a0f0a] hover:bg-[#c49464]"
                disabled={isLoggingIn}
              >
                {isLoggingIn ? "Entrando..." : "Entrar"}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-[#2a1810] rounded border border-[#8b6f47]">
              <p className="text-sm text-muted-foreground">
                <strong>Demo:</strong> Use email: demo@cafe.com | senha: demo123
              </p>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  // Admin panel
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2a1810] to-[#1a0f0a] text-foreground">
      {/* Header */}
      <div className="bg-[#3d2817] border-b border-[#8b6f47] sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setLocation("/")}
              className="text-[#d4a574] hover:bg-[#2a1810]"
            >
              <ArrowLeft size={20} />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-[#d4a574]">Painel Admin</h1>
              <p className="text-sm text-muted-foreground">Olá, {barista?.email}</p>
            </div>
          </div>
          <Button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            <LogOut size={18} className="mr-2" />
            Sair
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-6 p-4 bg-blue-900/20 border border-blue-700 rounded-lg flex gap-3">
          <AlertCircle className="text-blue-400 flex-shrink-0" size={20} />
          <div>
            <p className="font-semibold text-blue-300">Gerenciar Disponibilidade</p>
            <p className="text-sm text-blue-200">
              Ative ou desative itens para controlar o que está disponível hoje
            </p>
          </div>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-[#3d2817] border border-[#8b6f47]">
            <TabsTrigger value="daily" className="data-[state=active]:bg-[#8b6f47]">
              Diários
            </TabsTrigger>
            <TabsTrigger value="salgados" className="data-[state=active]:bg-[#8b6f47]">
              Salgados
            </TabsTrigger>
            <TabsTrigger value="doces" className="data-[state=active]:bg-[#8b6f47]">
              Doces
            </TabsTrigger>
            <TabsTrigger value="marmitas" className="data-[state=active]:bg-[#8b6f47]">
              Marmitas
            </TabsTrigger>
          </TabsList>

          {/* Daily Items Tab */}
          <TabsContent value="daily" className="space-y-4 mt-6">
            {dailyItems.length === 0 ? (
              <Card className="bg-[#3d2817] border-[#8b6f47] p-6 text-center">
                <p className="text-muted-foreground">Nenhum item de café disponível</p>
              </Card>
            ) : (
              dailyItems.map((item) => (
                <ItemToggle
                  key={item.id}
                  item={item}
                  onToggle={(isAvailable) =>
                    updateAvailability.mutate({
                      itemId: item.id,
                      isAvailable,
                    })
                  }
                  isLoading={updateAvailability.isPending}
                />
              ))
            )}
          </TabsContent>

          {/* Salgados Tab */}
          <TabsContent value="salgados" className="space-y-4 mt-6">
            {salgadosItems.length === 0 ? (
              <Card className="bg-[#3d2817] border-[#8b6f47] p-6 text-center">
                <p className="text-muted-foreground">Nenhum salgado disponível</p>
              </Card>
            ) : (
              salgadosItems.map((item) => (
                <ItemToggle
                  key={item.id}
                  item={item}
                  onToggle={(isAvailable) =>
                    updateAvailability.mutate({
                      itemId: item.id,
                      isAvailable,
                    })
                  }
                  isLoading={updateAvailability.isPending}
                />
              ))
            )}
          </TabsContent>

          {/* Doces Tab */}
          <TabsContent value="doces" className="space-y-4 mt-6">
            {docesItems.length === 0 ? (
              <Card className="bg-[#3d2817] border-[#8b6f47] p-6 text-center">
                <p className="text-muted-foreground">Nenhum doce disponível</p>
              </Card>
            ) : (
              docesItems.map((item) => (
                <ItemToggle
                  key={item.id}
                  item={item}
                  onToggle={(isAvailable) =>
                    updateAvailability.mutate({
                      itemId: item.id,
                      isAvailable,
                    })
                  }
                  isLoading={updateAvailability.isPending}
                />
              ))
            )}
          </TabsContent>

          {/* Marmitas Tab */}
          <TabsContent value="marmitas" className="space-y-4 mt-6">
            {marmitasItems.length === 0 ? (
              <Card className="bg-[#3d2817] border-[#8b6f47] p-6 text-center">
                <p className="text-muted-foreground">Nenhuma marmita disponível</p>
              </Card>
            ) : (
              marmitasItems.map((item) => (
                <ItemToggle
                  key={item.id}
                  item={item}
                  onToggle={(isAvailable) =>
                    updateAvailability.mutate({
                      itemId: item.id,
                      isAvailable,
                    })
                  }
                  isLoading={updateAvailability.isPending}
                />
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

/**
 * Item toggle component for availability control
 */
function ItemToggle({
  item,
  onToggle,
  isLoading,
}: {
  item: any;
  onToggle: (isAvailable: boolean) => void;
  isLoading: boolean;
}) {
  return (
    <Card className="bg-[#3d2817] border-[#8b6f47] p-4">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="font-semibold text-[#d4a574]">{item.name}</h3>
          {item.description && (
            <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
          )}
          <p className="text-sm font-medium text-[#8b6f47] mt-2">
            R$ {parseFloat(item.price).toFixed(2)}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {item.isAvailable ? (
            <div className="flex items-center gap-1 text-green-400">
              <CheckCircle2 size={18} />
              <span className="text-sm">Disponível</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 text-red-400">
              <AlertCircle size={18} />
              <span className="text-sm">Indisponível</span>
            </div>
          )}
          <Switch
            checked={item.isAvailable}
            onCheckedChange={onToggle}
            disabled={isLoading}
            className="data-[state=checked]:bg-green-600"
          />
        </div>
      </div>
    </Card>
  );
}
