import { X, CheckCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import type { CVState, CVPatch } from "@/state/types";
import { cn } from "@/lib/utils";

interface AiDiffModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    currentCV: CVState;
    patch: CVPatch;
    onApply: () => void;
}

function DiffSection({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden mb-4">
            <div className="bg-zinc-50 dark:bg-zinc-900/50 px-4 py-2 border-b border-zinc-200 dark:border-zinc-800">
                <h4 className="font-medium text-sm text-zinc-700 dark:text-zinc-300 capitalize">{title}</h4>
            </div>
            <div className="p-4">{children}</div>
        </div>
    );
}

function CompareBlock({ current, proposed }: { current: string | undefined; proposed: string | undefined }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
                <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Current</span>
                <div className="p-3 bg-red-50 dark:bg-red-950/20 text-red-900 dark:text-red-200 rounded text-sm min-h-[60px] whitespace-pre-wrap border border-red-100 dark:border-red-900/30">
                    {current || <span className="text-red-900/50 dark:text-red-200/50 italic">Empty</span>}
                </div>
            </div>
            <div className="space-y-1.5">
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-500 uppercase tracking-wider">Proposed</span>
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-900 dark:text-emerald-200 rounded text-sm min-h-[60px] whitespace-pre-wrap border border-emerald-100 dark:border-emerald-900/30">
                    {proposed || <span className="text-emerald-900/50 dark:text-emerald-200/50 italic">Empty</span>}
                </div>
            </div>
        </div>
    );
}

function CompareList({ items, renderItem }: { items: any[]; renderItem: (item: any) => React.ReactNode }) {
    if (!items || items.length === 0) return <div className="text-sm text-zinc-500 italic pb-2">Empty</div>;
    return (
        <ul className="space-y-2">
            {items.map((item, i) => (
                <li key={i} className="p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded border border-zinc-100 dark:border-zinc-800 text-sm">
                    {renderItem(item)}
                </li>
            ))}
        </ul>
    );
}

export function AiDiffModal({ open, onOpenChange, currentCV, patch, onApply }: AiDiffModalProps) {
    const hasChanges = Object.keys(patch).length > 0;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl max-h-[85vh] flex flex-col p-0 gap-0">
                <DialogHeader className="p-6 border-b border-zinc-200 dark:border-zinc-800">
                    <DialogTitle className="flex items-center gap-2">
                        Review AI Changes
                        <span className="text-xs font-normal px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300">
                            {Object.keys(patch).length} sections modified
                        </span>
                    </DialogTitle>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {!hasChanges && (
                        <div className="text-center py-8 text-zinc-500">
                            No changes proposed in this patch.
                        </div>
                    )}

                    {patch.summary !== undefined && (
                        <DiffSection title="Summary">
                            <CompareBlock current={currentCV.summary} proposed={patch.summary} />
                        </DiffSection>
                    )}

                    {patch.skills !== undefined && (
                        <DiffSection title="Skills">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider block mb-2">Current</span>
                                    <div className="flex flex-wrap gap-1.5 p-3 bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 rounded min-h-[60px]">
                                        {currentCV.skills.length > 0 ? currentCV.skills.map((s, i) => (
                                            <span key={i} className="px-2 py-1 text-xs bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200 rounded">{s}</span>
                                        )) : <span className="text-red-900/50 dark:text-red-200/50 italic text-sm">Empty</span>}
                                    </div>
                                </div>
                                <div>
                                    <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-500 uppercase tracking-wider block mb-2">Proposed</span>
                                    <div className="flex flex-wrap gap-1.5 p-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 rounded min-h-[60px]">
                                        {patch.skills.length > 0 ? patch.skills.map((s, i) => (
                                            <span key={i} className="px-2 py-1 text-xs bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-200 rounded">{s}</span>
                                        )) : <span className="text-emerald-900/50 dark:text-emerald-200/50 italic text-sm">Empty</span>}
                                    </div>
                                </div>
                            </div>
                        </DiffSection>
                    )}

                    {patch.experience !== undefined && (
                        <DiffSection title="Experience">
                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                                <div>
                                    <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider block mb-2">Current</span>
                                    <CompareList items={currentCV.experience} renderItem={(item) => (
                                        <div className="space-y-1">
                                            <div className="font-medium">{item.role} @ {item.company}</div>
                                            <div className="text-xs text-zinc-500">{item.startDate} - {item.endDate || "Present"}</div>
                                            <div className="text-xs mt-2 whitespace-pre-wrap">{item.description}</div>
                                        </div>
                                    )} />
                                </div>
                                <div>
                                    <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-500 uppercase tracking-wider block mb-2">Proposed</span>
                                    <div className="relative">
                                        <div className="absolute -left-4 top-1/2 -translate-y-1/2 hidden xl:flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 z-10 border-4 border-white dark:border-zinc-950">
                                            <ArrowRight className="w-4 h-4" />
                                        </div>
                                        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 rounded-lg">
                                            <CompareList items={patch.experience} renderItem={(item) => (
                                                <div className="space-y-1">
                                                    <div className="font-medium text-emerald-900 dark:text-emerald-100">{item.role} @ {item.company}</div>
                                                    <div className="text-xs text-emerald-700 dark:text-emerald-400">{item.startDate} - {item.endDate || "Present"}</div>
                                                    <div className="text-xs mt-2 whitespace-pre-wrap text-emerald-800 dark:text-emerald-200">{item.description}</div>
                                                </div>
                                            )} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </DiffSection>
                    )}

                    {patch.education !== undefined && (
                        <DiffSection title="Education">
                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                                <div>
                                    <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider block mb-2">Current</span>
                                    <CompareList items={currentCV.education} renderItem={(item) => (
                                        <div className="space-y-1">
                                            <div className="font-medium">{item.degree}</div>
                                            <div className="text-xs text-zinc-500">{item.institution} ({item.year})</div>
                                        </div>
                                    )} />
                                </div>
                                <div>
                                    <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-500 uppercase tracking-wider block mb-2">Proposed</span>
                                    <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 rounded-lg">
                                        <CompareList items={patch.education} renderItem={(item) => (
                                            <div className="space-y-1">
                                                <div className="font-medium text-emerald-900 dark:text-emerald-100">{item.degree}</div>
                                                <div className="text-xs text-emerald-700 dark:text-emerald-400">{item.institution} ({item.year})</div>
                                            </div>
                                        )} />
                                    </div>
                                </div>
                            </div>
                        </DiffSection>
                    )}

                    {patch.projects !== undefined && (
                        <DiffSection title="Projects">
                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                                <div>
                                    <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider block mb-2">Current</span>
                                    <CompareList items={currentCV.projects} renderItem={(item) => (
                                        <div className="space-y-1">
                                            <div className="font-medium">{item.name}</div>
                                            <div className="text-xs text-zinc-500">{item.role}</div>
                                            <div className="text-xs mt-2 whitespace-pre-wrap">{item.description}</div>
                                        </div>
                                    )} />
                                </div>
                                <div>
                                    <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-500 uppercase tracking-wider block mb-2">Proposed</span>
                                    <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 rounded-lg">
                                        <CompareList items={patch.projects} renderItem={(item) => (
                                            <div className="space-y-1">
                                                <div className="font-medium text-emerald-900 dark:text-emerald-100">{item.name}</div>
                                                <div className="text-xs text-emerald-700 dark:text-emerald-400">{item.role}</div>
                                                <div className="text-xs mt-2 whitespace-pre-wrap text-emerald-800 dark:text-emerald-200">{item.description}</div>
                                            </div>
                                        )} />
                                    </div>
                                </div>
                            </div>
                        </DiffSection>
                    )}

                    {patch.certifications !== undefined && (
                        <DiffSection title="Certifications">
                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                                <div>
                                    <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider block mb-2">Current</span>
                                    <CompareList items={currentCV.certifications} renderItem={(item) => (
                                        <div className="space-y-1">
                                            <div className="font-medium">{item.title}</div>
                                            <div className="text-xs text-zinc-500">{item.issuer} {item.year && `(${item.year})`}</div>
                                        </div>
                                    )} />
                                </div>
                                <div>
                                    <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-500 uppercase tracking-wider block mb-2">Proposed</span>
                                    <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 rounded-lg">
                                        <CompareList items={patch.certifications} renderItem={(item) => (
                                            <div className="space-y-1">
                                                <div className="font-medium text-emerald-900 dark:text-emerald-100">{item.title}</div>
                                                <div className="text-xs text-emerald-700 dark:text-emerald-400">{item.issuer} {item.year && `(${item.year})`}</div>
                                            </div>
                                        )} />
                                    </div>
                                </div>
                            </div>
                        </DiffSection>
                    )}

                    {patch.languages !== undefined && (
                        <DiffSection title="Languages">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider block mb-2">Current</span>
                                    <div className="flex flex-wrap gap-2 p-3 bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 rounded min-h-[60px]">
                                        {currentCV.languages.length > 0 ? currentCV.languages.map((l, i) => (
                                            <span key={i} className="px-2 py-1 text-xs bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200 rounded border border-red-200 dark:border-red-900/50">
                                                <span className="font-medium">{l.language}</span> <span className="text-red-600/70 dark:text-red-400/70 ml-1">{l.proficiency}</span>
                                            </span>
                                        )) : <span className="text-red-900/50 dark:text-red-200/50 italic text-sm">Empty</span>}
                                    </div>
                                </div>
                                <div>
                                    <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-500 uppercase tracking-wider block mb-2">Proposed</span>
                                    <div className="flex flex-wrap gap-2 p-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 rounded min-h-[60px]">
                                        {patch.languages.length > 0 ? patch.languages.map((l, i) => (
                                            <span key={i} className="px-2 py-1 text-xs bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-200 rounded border border-emerald-200 dark:border-emerald-900/50">
                                                <span className="font-medium">{l.language}</span> <span className="text-emerald-600/70 dark:text-emerald-400/70 ml-1">{l.proficiency}</span>
                                            </span>
                                        )) : <span className="text-emerald-900/50 dark:text-emerald-200/50 italic text-sm">Empty</span>}
                                    </div>
                                </div>
                            </div>
                        </DiffSection>
                    )}
                </div>

                <DialogFooter className="p-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 flex flex-row justify-end items-center gap-2">
                    <Button
                        variant="ghost"
                        onClick={() => onOpenChange(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={() => {
                            onApply();
                            onOpenChange(false);
                        }}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2"
                    >
                        <CheckCheck className="w-4 h-4" />
                        Apply Changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
