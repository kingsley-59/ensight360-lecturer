import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "../ui/badge"

const sampleRegistry = [
    { name: "Olivia Martin", email: "olivia.martin@email.com", isClassAdviser: false, isHod: false },
    { name: "Jackson Lee", email: "jackson.lee@email.com", isClassAdviser: true, isHod: true },
    { name: "Isabella Nguyen", email: "isabella.nguyen@email.com", isClassAdviser: true, isHod: false },
    { name: "William Kim", email: "will@email.com", isClassAdviser: false, isHod: false },
    { name: "Sofia Davis", email: "sofia.davis@email.com", isClassAdviser: false, isHod: false },
    { name: "Elizabeth Keen", email: "lizkeen@email.com", isClassAdviser: true, isHod: false },
]

export function DeptRegistry() {
    return (
        <div className="space-y-8">
            {sampleRegistry.map((entry, idx) => (
                <div className="flex items-center" key={idx}>
                    <Avatar className="h-9 w-9">
                        <AvatarImage src="/avatars/01.png" alt="Avatar" />
                        <AvatarFallback>{entry.name.slice(0, 2).toLocaleUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">{entry.name}</p>
                        <p className="text-sm text-muted-foreground">
                            {entry.email}
                        </p>
                    </div>
                    {entry.isHod ? (
                        <Badge variant={'default'} className="ml-auto">HOD</Badge>
                    ) : entry.isClassAdviser ? (
                        <Badge variant={'secondary'} className="ml-auto">Adviser</Badge>
                    ) : (<></>)}
                    
                </div>
            ))}

        </div>
    )
}