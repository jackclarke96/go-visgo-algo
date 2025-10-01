import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RichText } from "./RichText";

interface DeepDiveModalProps {
  trigger: string;
  title: string;
  content: string;
}

export const DeepDiveModal = ({ trigger, title, content }: DeepDiveModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-auto p-1 text-info hover:text-info/80 hover:bg-info/10"
        >
          <Info className="h-4 w-4 mr-1" />
          <span className="underline decoration-dotted">{trigger}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{title}</DialogTitle>
        </DialogHeader>
        <DialogDescription asChild>
          <div className="mt-4 space-y-4 text-foreground">
            <RichText content={content} />
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};
