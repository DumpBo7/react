import { Card } from "@/components/card/Card";

export default function Home() {
    const cardTitle = "Hola!";

    return (
        <main>
            <Card title={cardTitle}>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Omnis quibusdam expedita ipsam consequuntur minus esse
                    minima ab. Doloribus nemo quasi ducimus distinctio animi
                    provident, numquam eveniet! Cum corporis veritatis aperiam.
                </p>
            </Card>
        </main>
    );
}
