import { useState } from "react";
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

export default function AdminPanel() {
  const [, setLocation] = useLocation();
  const { barista, logout, isAuthenticated, loading, login } = useBaristaAuth();
  const [selectedTab, setSelectedTab] = useState("daily");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // A CONSULTA SÓ É ATIVADA SE ESTIVER AUTENTICADO E NÃO ESTIVER CARREGANDO
  // Isso impede o erro de "null" ou "undefined" que faz a tela piscar
  const { data: allItems = [] } = trpc.admin.getAllItems.useQuery(undefined, {
    enabled: !!isAuthenticated && !loading,
    retry: false,
  });

  const dailyItems = allItems.filter((item: any) => item.category === "daily");
  const salgadosItems = allItems.filter((item: any) => item.category === "salgados");
  const docesItems = allItems.filter((item: any) => item.category === "doces");
  const marmitasItems = allItems.filter((item: any) => item.category.startsWith("marmitas"));

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

  // ESTADO DE CARREGAMENTO INICIAL
  if (loading) {
    return (
      <div className="min-h-screen bg-[#1a0f0a] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#d4a574] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#d4a574]">Verificando acesso...</p>
        </div>
      </div>
    );
  }

  // TELA DE LOGIN (CORRIGIDA)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#2a1810] to-[#1a0f0a] text-foreground flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-[#3d2817] border-[#8b6f47] shadow-2xl">
          <div className="p-8">
            <h1 className="text-2xl font-bold text-center mb-2 text-[#d4a574]">Painel Admin</h1>
            <p className="text-center text-[#8b6f47] mb-6">Café da Júlio - Farroupilha</p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-[#d4a574]">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="demo@cafe.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-[#2a1810] border-[#8b6f47] text-white focus:ring-[#d4a574]"
                  required
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-[#d4a574]">Senha</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-[#2a1810] border-[#8b6f47] text-white pr-10 focus:ring-[#d4a574]"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-[#8b6f47] hover:text-[#d4a574]"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#d4a574] text-[#1a0f0a] font-bold hover:bg-[#c49464]"
                disabled={isLoggingIn}
              >
                {isLoggingIn ? "Autenticando..." : "Entrar no Painel"}
              </Button>
            </form>
          </div>
        </Card>
      </div>
    );
  }

  // PAINEL ADMINISTRATIVO (CORRIGIDO)
  return (
    <div className="min-h-screen bg-[#1a0f0a] text-foreground pb-12">
      <header className="bg-[#3d2817] border-b border-[#8b6f47] sticky top-0 z-50">
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
              <h1 className="text-xl font-bold text-[#d4a574]">Gestão de Menu</h1>
              <p className="text-xs text-[#8b6f47]">{barista?.email}</p>
            </div>
          </div>
          <Button onClick={handleLogout} variant="destructive" size="sm">
            <LogOut size={18} className="mr-2" /> Sair
          </Button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-[#3d2817] border border-[#8b6f47]">
            <TabsTrigger value="daily" className="data-[state=active]:bg-[#8b6f47] text-[#d4a574]">Diários</TabsTrigger>
            <TabsTrigger value="salgados" className="data-[state=active]:bg-[#8b6f47] text-[#d4a574]">Salgados</TabsTrigger>
            <TabsTrigger value="doces" className="data-[state=active]:bg-[#8b6f47] text-[#d4a574]">Doces</TabsTrigger>
            <TabsTrigger value="marmitas" className="data-[state=active]:bg-[#8b6f47] text-[#d4a574]">Marmitas</TabsTrigger>
          </TabsList>

          <div className="mt-8 space-y-4">
            {renderTabContent(selectedTab, { dailyItems, salgadosItems, docesItems, marmitasItems }, updateAvailability)}
          </div>
        </Tabs>
      </main>
    </div>
  );
}

function renderTabContent(tab: string, items: any, mutation: any) {
  const currentItems = 
    tab === "daily" ? items.dailyItems :
    tab === "salgados" ? items.salgadosItems :
    tab === "doces" ? items.docesItems : items.marmitasItems;

  if (currentItems.length === 0) {
    return (
      <Card className="bg-[#3d2817] border-[#8b6f47] p-8 text-center text-[#8b6f47]">
        Não há itens cadastrados nesta categoria.
      </Card>
    );
  }

  return currentItems.map((item: any) => (
    <Card key={item.id} className="bg-[#3d2817] border-[#8b6f47] p-4 flex items-center justify-between">
      <div>
        <h3 className="font-bold text-[#d4a574]">{item.name}</h3>
        <p className="text-sm text-[#8b6f47]">R$ {parseFloat(item.price).toFixed(2)}</p>
      </div>
      <div className="flex items-center gap-4">
        <span className={`text-xs font-bold ${item.isAvailable ? 'text-green-500' : 'text-red-500'}`}>
          {item.isAvailable ? 'DISPONÍVEL' : 'ESGOTADO'}
        </span>
        <Switch
          checked={item.isAvailable}
          onCheckedChange={(val) => mutation.mutate({ itemId: item.id, isAvailable: val })}
          disabled={mutation.isPending}
          className="data-[state=checked]:bg-green-600"
        />
      </div>
    </Card>
  ));
}