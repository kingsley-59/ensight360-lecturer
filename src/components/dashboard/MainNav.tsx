
import { cn } from "@/lib/utils"

export function MainNav({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) {
    return (
        <nav
            className={cn("flex items-center space-x-4 lg:space-x-6", className)}
            {...props}
        >
            <a
                href="/dashboard/home"
                className="text-sm font-medium transition-colors hover:text-primary"
            >
                Overview
            </a>
            <a
                href="/dashboard/courses"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
                Courses
            </a>
            <a
                href="/dashboard/students"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
                Students
            </a>
            <a
                href="/dashboard/results"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
                Results
            </a>
        </nav>
    )
}