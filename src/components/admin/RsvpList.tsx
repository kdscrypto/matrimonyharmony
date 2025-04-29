
import { useState, useEffect } from "react";
import { getAllRsvps, deleteRsvp } from "@/services/rsvp.service";
import { useToast } from "@/hooks/use-toast";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { Trash2, RefreshCw, Shield } from "lucide-react";

interface Rsvp {
  id: string;
  name: string;
  email: string;
  attending: boolean;
  guest_count: number;
  dietary_restrictions: string | null;
  message: string | null;
  created_at: string;
}

const RsvpList = () => {
  const [rsvps, setRsvps] = useState<Rsvp[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteRsvpId, setDeleteRsvpId] = useState<string | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { toast } = useToast();

  const fetchRsvps = async () => {
    setLoading(true);
    try {
      const data = await getAllRsvps();
      setRsvps(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des RSVP:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les RSVP. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRsvps();
  }, [toast]);

  const handleDeleteClick = (id: string) => {
    setDeleteRsvpId(id);
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteRsvpId) return;
    
    setIsDeleting(true);
    try {
      await deleteRsvp(deleteRsvpId);
      
      // Mettre à jour la liste des RSVP
      setRsvps(prev => prev.filter(rsvp => rsvp.id !== deleteRsvpId));
      
      toast({
        title: "Suppression réussie",
        description: "Le RSVP a été supprimé avec succès.",
      });
    } catch (error) {
      console.error("Erreur lors de la suppression du RSVP:", error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le RSVP. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
      setShowDeleteDialog(false);
      setDeleteRsvpId(null);
    }
  };

  const handleRefresh = () => {
    fetchRsvps();
  };

  const totalGuests = rsvps.reduce((total, rsvp) => {
    if (rsvp.attending) {
      return total + 1 + rsvp.guest_count;
    }
    return total;
  }, 0);

  const attendingCount = rsvps.filter(rsvp => rsvp.attending).length;
  const notAttendingCount = rsvps.filter(rsvp => !rsvp.attending).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 justify-between items-center">
        <h2 className="text-3xl font-playfair">Récapitulatif des RSVP</h2>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="px-3 py-1 text-sm bg-wedding-gold text-white">
              Total des invités confirmés: {totalGuests}
            </Badge>
            <Badge variant="outline" className="px-3 py-1 text-sm bg-green-600 text-white">
              Présents: {attendingCount}
            </Badge>
            <Badge variant="outline" className="px-3 py-1 text-sm bg-red-600 text-white">
              Absents: {notAttendingCount}
            </Badge>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1" 
            onClick={handleRefresh} 
            disabled={loading}
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            Actualiser
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-10">Chargement des RSVP...</div>
      ) : rsvps.length === 0 ? (
        <div className="text-center py-10">Aucun RSVP trouvé.</div>
      ) : (
        <Table>
          <TableCaption>Liste des RSVP - Total: {rsvps.length}</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Présence</TableHead>
              <TableHead>Invités</TableHead>
              <TableHead>Restrictions alimentaires</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rsvps.map((rsvp) => (
              <TableRow key={rsvp.id}>
                <TableCell className="font-medium">{rsvp.name}</TableCell>
                <TableCell>{rsvp.email}</TableCell>
                <TableCell>
                  {rsvp.attending ? (
                    <Badge className="bg-green-100 text-green-800 border-green-300">
                      Présent
                    </Badge>
                  ) : (
                    <Badge className="bg-red-100 text-red-800 border-red-300">
                      Absent
                    </Badge>
                  )}
                </TableCell>
                <TableCell>{rsvp.guest_count}</TableCell>
                <TableCell>{rsvp.dietary_restrictions || "-"}</TableCell>
                <TableCell className="max-w-xs truncate">
                  {rsvp.message ? (
                    <span title={rsvp.message}>
                      {rsvp.message.length > 50 
                        ? `${rsvp.message.substring(0, 50)}...` 
                        : rsvp.message}
                    </span>
                  ) : (
                    "-"
                  )}
                </TableCell>
                <TableCell title={new Date(rsvp.created_at).toLocaleString()}>
                  {formatDistanceToNow(new Date(rsvp.created_at), { 
                    addSuffix: true,
                    locale: fr 
                  })}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={() => handleDeleteClick(rsvp.id)}
                    title="Supprimer"
                  >
                    <Trash2 size={18} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmez la suppression</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer cette réponse RSVP ? Cette action ne peut pas être annulée.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Annuler</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleConfirmDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? "Suppression..." : "Supprimer"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default RsvpList;
