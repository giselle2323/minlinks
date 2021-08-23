import prisma from '../../lib/prisma';
import Admin from "../../layouts/Admin";
import ArticleCard from "../../components/Cards/Card";
export default function Dashboard ({cards}) {
    return (
    <main className="flex flex-col w-full">
        <div>beans</div>
        {/* <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {cards.map(card => (
                <ArticleCard key={card.id} />
            ))}
        </ul> */}
    </main>
    )
}

Dashboard.layout = Admin;