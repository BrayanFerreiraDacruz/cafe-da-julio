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

  // A consulta só ativa após o login, evitando erros de contexto
  const { data: allItems = [] } = trpc.admin.getAllItems.useQuery(undefined, {
    enabled: !!isAuthenticated && !loading,
    retry: false,
  });

  const dailyItems = allItems.filter((item: any) => item.category === "daily");
  const salgadosItems = allItems.filter((item: any) => item.category === "salgados");
  const docesItems = allItems.filter((item: any) => item.category === "doces");
  const marmitasItems = allItems.filter((item: any) => item.category.startsWith("marmitas"));

  const updateAvailability = trpc.admin.updateItemAvailability.useMutation({
    onSuccess: () => toast.success("Disponibilidade atualizada!"),
    onError: (error) => toast.error("Erro ao atualizar: " + error.message),
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    try {
      await login(email, password);
      toast.success("Login realizado!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erro ao fazer login");
    } finally {
      setIsLoggingIn(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1a0f0a] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#d4a574] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#1a0f0a] flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-[#3d2817] border-[#8b6f47] p-8 shadow-2xl">
          <h1 className="text-2xl font-bold text-center mb-6 text-[#d4a574]">Painel Admin</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label className="text-[#d4a574]">Email</Label>
              <Input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="bg-[#2a1810] border-[#8b6f47] text-white" 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[#d4a574]">Senha</Label>
              <div className="relative">
                <Input 
                  type={showPassword ? "text" : "password"} 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  className="bg-[#2a1810] border-[#8b6f47] text-white" 
                  required 
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-2.5 text-[#8b6f47]">
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            <Button type="submit" className="w-full bg-[#d4a574] text-[#1a0f0a] font-bold" disabled={isLoggingIn}>
              {isLoggingIn ? "Entrando..." : "Entrar"}
            </Button>
          </form>
          <p className="mt-4 text-xs text-[#8b6f47] text-center">demo@cafe.com | demo123</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a0f0a] text-foreground">
      <header className="bg-[#3d2817] border-b border-[#8b6f47] p-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => setLocation("/")} className="text-[#d4a574]"><ArrowLeft /></Button>
          <h1 className="text-xl font-bold text-[#d4a574]">Gestão de Menu</h1>
        </div>
        <Button onClick={() => logout().then(() => setLocation("/"))} variant="destructive">Sair</Button>
      </header>

      <main className="max-w-4xl mx-auto p-4 mt-6">
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid grid-cols-4 bg-[#3d2817] border-[#8b6f47]">
            <TabsTrigger value="daily">Diários</TabsTrigger>
            <TabsTrigger value="salgados">Salgados</TabsTrigger>
            <TabsTrigger value="doces">Doces</TabsTrigger>
            <TabsTrigger value="marmitas">Marmitas</TabsTrigger>
          </TabsList>

          <div className="mt-8 space-y-4">
            {(selectedTab === "daily" ? dailyItems : 
              selectedTab === "salgados" ? salgadosItems : 
              selectedTab === "doces" ? docesItems : marmitasItems).map((item: any) => (
              <Card key={item.id} className="bg-[#3d2817] border-[#8b6f47] p-4 flex justify-between items-center">
                <span className="font-bold text-[#d4a574]">{item.name}</span>
                <Switch 
                  checked={item.isAvailable} 
                  onCheckedChange={(val) => updateAvailability.mutate({ itemId: item.id, isAvailable: val })} 
                  disabled={updateAvailability.isPending}
                />
              </Card>
            ))}
          </div>
        </Tabs>
      </main>
    </div>
  );
}