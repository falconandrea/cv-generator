import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface WelcomeDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onImportPdf: () => void
  onImportJson: () => void
  onStartFromScratch: () => void
}

export function WelcomeDialog({
  isOpen,
  onOpenChange,
  onImportPdf,
  onImportJson,
  onStartFromScratch
}: WelcomeDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg space-y-4">
        <DialogHeader className="flex flex-col items-center justify-center space-y-1 gap-1">
          <DialogTitle className="text-2xl font-semibold">Welcome to CraftCV</DialogTitle>
          <DialogDescription className="text-center">
            Start by choosing how you want to create your CV
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-2">
          <Card className="group cursor-pointer hover:bg-muted/50 hover:border-primary transition-colors py-4 gap-4" onClick={onImportPdf}>
            <CardHeader className="text-center gap-1">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <CardTitle className="text-lg">Import from PDF</CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Auto-fill your CV using AI from an existing PDF
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="group cursor-pointer hover:bg-muted/50 hover:border-primary transition-colors py-4 gap-4" onClick={onImportJson}>
            <CardHeader className="text-center flex flex-col items-center gap-1">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <CardTitle className="text-lg">Import from JSON</CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Restore your CV from a backup file
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="group cursor-pointer hover:bg-muted/50 hover:border-primary transition-colors py-4 gap-4" onClick={onStartFromScratch}>
            <CardHeader className="text-center gap-1">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <CardTitle className="text-lg">Start from Scratch</CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Create a new CV from blank
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="pt-2 border-t">
          <DialogDescription className="text-xs text-muted-foreground text-center">
            You can always import or export your CV later from the top navigation
          </DialogDescription>
        </div>
      </DialogContent>
    </Dialog>
  )
}