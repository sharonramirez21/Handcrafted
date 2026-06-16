import styles from "./about.module.css";

export default async function AboutPage() {
    return (
        <div className={styles.aboutpage}>
            <div className={styles.titleAbout}>
                <h1>About Us</h1>
            </div>
            <div className={styles.missionvisionPart}>
                <div className={styles.missionDiv}>
                    <div>
                        <h2 className={styles.titleMission}>Our Mission</h2>
                    </div>
                    <div>
                        <p className={styles.missionText}>Our mission is to connect passionate artisans with people who appreciate the beauty of handmade. We believe every handcrafted piece tells a story — of skill, dedication, and creativity — and we&#39;re here to make sure those stories reach the right hands.</p>
                    </div>
                </div>
                <div className={styles.visionDiv}>
                    <h2 className={styles.visionTitle}>Our Vision</h2>
                    <p className={styles.visionText}>Our vision is a future where every artisan, no matter where they are in the world, has equal access to a global audience. A future where small workshops thrive, traditional crafts are preserved, and handmade culture is celebrated as the art form it truly is.</p>
                </div>
            </div>
            <div className={styles.valuesDiv}>
                <h2 className={styles.valuesTitle}>Our Values</h2>
                <ul className={styles.listValues}>
                    <li>We <span>celebrate real craftsmanship</span> and the genuine stories behind every handmade piece.</li>
                    <li>We <span>believe in supporting independent makers</span> and building meaningful connections between artisans and buyers.</li>
                    <li>We champion <span>original ideas</span> and unique creations that can&#39;t be found anywhere else.</li>
                    <li>Every <span>artisan deserves a platform</span>, regardless of their background, location, or the size of their workshop.</li>
                </ul>
            </div>
            <hr className={styles.divider} />
        </div>
    )
}