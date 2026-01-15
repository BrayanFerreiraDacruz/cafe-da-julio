import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ArrowLeft, LogOut, AlertCircle, CheckCircle2 } from "lucide-react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { toast } from "sonner";

/**
 * Admin Panel page - Barista interface for managing daily menu availability
 * Only accessible to admin users. Allows toggling availability of items by category.
 */
export default function AdminPanel() {
  const [, setLocation] = useLocation();
  const { user, logout, isAuthenticated, loading } = useAuth();
  const [selectedTab, setSelectedTab] = useState("daily");

  // Fetch menu items
  const { data: dailyItems = [] } = trpc.menu.getByCategory.useQuery({ category: "daily" });
  const { data: salgadosItems = [] } = trpc.menu.getByCategory.useQuery({ category: "salgados" });
  const { data: docesItems = [] } = trpc.menu.getByCategory.useQuery({ category: "doces" });

  // Mutation for updating availability
  const updateAvailability = trpc.admin.updateItemAvailability.useMutation({
    onSuccess: () => {
      toast.success("Disponibilidade atualizada!");
    },
    onError: (error) => {
      toast.error("Erro ao atualizar: " + error.message);
    },
  });

  // Check if user is admin
  const { data: isAdmin } = trpc.admin.isAdmin.useQuery();

  // Redirect if not authenticated or not admin
  useEffect(() => {
    if (!loading && (!isAuthenticated || user?.role !== "admin")) {
      setLocation("/");
    }
  }, [isAuthenticated, user, loading, setLocation]);

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

  if (!isAuthenticated || user?.role !== "admin") {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <Card className="p-8 max-w-md">
          <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
          <h2 className="text-xl font-bold text-center mb-2">Acesso Negado</h2>
          <p className="text-muted-foreground text-center mb-6">
            Você não tem permissão para acessar o painel administrativo.
          </p>
          <Button onClick={() => setLocation("/")} className="w-full">
            Voltar para Home
          </Button>
        </Card>
      </div>
    );
  }

  const handleLogout = async () => {
    await logout();
    setLocation("/");
  };

  const handleToggleAvailability = (itemId: number, currentStatus: boolean) => {
    updateAvailability.mutate({
      itemId,
      isAvailable: !currentStatus,
    });
  };

  const MenuItem = ({ item }: { item: any }) => (
    <Card className="p-4 flex items-center justify-between hover:shadow-md transition-shadow">
      <div className="flex-1">
        <h3 className="font-semibold text-foreground">{item.name}</h3>
        <p className="text-sm text-muted-foreground">R$ {parseFloat(item.price).toFixed(2)}</p>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          {item.isAvailable ? (
            <CheckCircle2 className="w-5 h-5 text-green-600" />
          ) : (
            <AlertCircle className="w-5 h-5 text-destructive" />
          )}
          <span className="text-sm font-medium">
            {item.isAvailable ? "Disponível" : "Indisponível"}
          </span>
        </div>
        <Switch
          checked={item.isAvailable}
          onCheckedChange={() => handleToggleAvailability(item.id, item.isAvailable)}
          disabled={updateAvailability.isPending}
        />
      </div>
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
          <h1 className="text-xl font-bold text-primary">Painel Administrativo</h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="text-destructive hover:text-destructive"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container py-8">
        {/* Welcome Card */}
        <Card className="p-6 mb-8 bg-primary/5 border-primary/20">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Bem-vindo, {user?.name}!
          </h2>
          <p className="text-muted-foreground">
            Gerencie a disponibilidade dos itens do menu do Café da Júlio. Ative ou desative itens conforme necessário.
          </p>
        </Card>

        {/* Instructions */}
        <Card className="p-6 mb-8 bg-accent/5 border-accent/20">
          <h3 className="font-semibold text-foreground mb-3">Como usar:</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">1.</span>
              <span>Selecione a categoria de itens que deseja gerenciar</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">2.</span>
              <span>Use o botão de alternância para ativar ou desativar cada item</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">3.</span>
              <span>Os clientes verão apenas os itens disponíveis no site</span>
            </li>
          </ul>
        </Card>

        {/* Menu Management */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="daily">Disponíveis do Dia</TabsTrigger>
            <TabsTrigger value="salgados">Salgados</TabsTrigger>
            <TabsTrigger value="doces">Doces</TabsTrigger>
          </TabsList>

          {/* Daily Items Tab */}
          <TabsContent value="daily" className="space-y-4">
            {dailyItems.length === 0 ? (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground">
                  Nenhum item disponível do dia. Adicione itens via banco de dados.
                </p>
              </Card>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-foreground">
                    {dailyItems.length} item(ns) do dia
                  </h3>
                  <span className="text-sm text-muted-foreground">
                    {dailyItems.filter((i) => i.isAvailable).length} disponível(is)
                  </span>
                </div>
                {dailyItems.map((item) => (
                  <MenuItem key={item.id} item={item} />
                ))}
              </div>
            )}
          </TabsContent>

          {/* Salgados Tab */}
          <TabsContent value="salgados" className="space-y-4">
            {salgadosItems.length === 0 ? (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground">
                  Nenhum salgado disponível. Adicione itens via banco de dados.
                </p>
              </Card>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-foreground">
                    {salgadosItems.length} salgado(s)
                  </h3>
                  <span className="text-sm text-muted-foreground">
                    {salgadosItems.filter((i) => i.isAvailable).length} disponível(is)
                  </span>
                </div>
                {salgadosItems.map((item) => (
                  <MenuItem key={item.id} item={item} />
                ))}
              </div>
            )}
          </TabsContent>

          {/* Doces Tab */}
          <TabsContent value="doces" className="space-y-4">
            {docesItems.length === 0 ? (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground">
                  Nenhum doce disponível. Adicione itens via banco de dados.
                </p>
              </Card>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-foreground">
                    {docesItems.length} doce(s)
                  </h3>
                  <span className="text-sm text-muted-foreground">
                    {docesItems.filter((i) => i.isAvailable).length} disponível(is)
                  </span>
                </div>
                {docesItems.map((item) => (
                  <MenuItem key={item.id} item={item} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Info Card */}
        <Card className="mt-8 p-6 bg-muted/30 border-border">
          <h3 className="font-semibold text-foreground mb-3">Dicas Importantes:</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Desative itens que não estão disponíveis para evitar decepções dos clientes</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>As mudanças são aplicadas imediatamente no site</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Você pode gerenciar itens de todas as categorias a qualquer momento</span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
