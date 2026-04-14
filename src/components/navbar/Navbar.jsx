import styles from "@/assets/styles/navbar/Navbar.module.css";
import data from "@/assets/data/nav.json";
import Link from "next/link";

export const Navbar = () => {
    console.log(data);
    return (
        <header>
            <nav className={styles.contenedor}>
                <span>Mi Logo</span>
                <ul className={styles.linksList}>
                    {data.map((link) => (
                        <li key={link.id}>
                            <Link href={link.href}>{link.label}</Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
};
