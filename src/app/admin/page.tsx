import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, Users, ShoppingCart, ArrowUpRight, Plus } from 'lucide-react';

export default function AdminDashboard() {
  const recentOrders = [
    { id: 'ORD-001', customer: 'Alice Martin', date: '2024-05-15', total: '450,00 €', status: 'En attente' },
    { id: 'ORD-002', customer: 'Marc Bernard', date: '2024-05-14', total: '189,00 €', status: 'Expédié' },
    { id: 'ORD-003', customer: 'Sophie Morel', date: '2024-05-14', total: '320,00 €', status: 'Livré' },
  ];

  return (
    <div className="container mx-auto px-6 py-12 space-y-12">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold uppercase tracking-tighter">Tableau de Bord Admin</h1>
          <p className="text-muted-foreground font-light text-sm">Gestion des commandes et du catalogue.</p>
        </div>
        <div className="flex gap-4">
          <Link href="/admin/generator">
            <Button variant="outline" className="rounded-none text-[10px] font-bold uppercase tracking-widest">
              Générateur IA
            </Button>
          </Link>
          <Button className="rounded-none bg-foreground text-background text-[10px] font-bold uppercase tracking-widest">
            Nouveau Produit
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="rounded-none">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Commandes Totales</CardTitle>
            <ShoppingCart className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tracking-tighter">124</div>
            <p className="text-[10px] text-green-600 mt-1 uppercase font-bold">+12% ce mois</p>
          </CardContent>
        </Card>
        <Card className="rounded-none">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Produits Actifs</CardTitle>
            <Package className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tracking-tighter">48</div>
            <p className="text-[10px] text-muted-foreground mt-1 uppercase font-bold">3 collections</p>
          </CardContent>
        </Card>
        <Card className="rounded-none">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Clients</CardTitle>
            <Users className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tracking-tighter">892</div>
            <p className="text-[10px] text-green-600 mt-1 uppercase font-bold">+5 nouveaux</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold uppercase tracking-widest">Dernières Commandes</h2>
          <Button variant="link" className="text-xs font-bold uppercase tracking-widest">Voir tout</Button>
        </div>
        <Card className="rounded-none overflow-hidden">
          <Table>
            <TableHeader className="bg-secondary/50">
              <TableRow>
                <TableHead className="text-[10px] font-bold uppercase tracking-widest">ID Commande</TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-widest">Client</TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-widest">Date</TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-widest text-right">Montant</TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-widest">Statut</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentOrders.map((order) => (
                <TableRow key={order.id} className="hover:bg-muted/30">
                  <TableCell className="font-medium text-xs tracking-widest">{order.id}</TableCell>
                  <TableCell className="text-xs">{order.customer}</TableCell>
                  <TableCell className="text-xs font-light">{order.date}</TableCell>
                  <TableCell className="text-xs font-bold text-right">{order.total}</TableCell>
                  <TableCell>
                    <span className={`text-[10px] font-bold uppercase px-2 py-1 ${
                      order.status === 'En attente' ? 'text-orange-500' : 
                      order.status === 'Expédié' ? 'text-primary' : 'text-green-600'
                    }`}>
                      {order.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ArrowUpRight className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
}