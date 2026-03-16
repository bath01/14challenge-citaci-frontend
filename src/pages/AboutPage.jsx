import { CI_ORANGE, CI_GREEN } from "@/data/constants"
import { teamMembers, techStack } from "@/data/team"
import { useTheme } from "@/context/ThemeContext"
import SectionTitle from "@/components/ui/SectionTitle"

/**
 * Page "À propos" : présentation du projet, équipe, stack technique
 */
export default function AboutPage() {
  const { darkMode, textPrimary, textSecondary, cardBorder, glassBg, glassBorder } =
    useTheme()

  return (
    <div className="relative z-[1] max-w-[1200px] mx-auto px-4 sm:px-8 lg:px-12">
      <div className="pt-8 sm:pt-12 pb-8 max-w-[720px]">
        <SectionTitle title="À propos" subtitle="Le projet CitaCI" />

        {/* Carte principale */}
        <div
          className="rounded-2xl p-5 sm:p-8 mb-6 backdrop-blur-[20px]"
          style={{
            background: glassBg,
            border: `1px solid ${glassBorder}`,
          }}
        >
          {/* Drapeau */}
          <div
            className="flex w-12 sm:w-16 h-8 sm:h-10 rounded-md overflow-hidden mb-5 sm:mb-6"
            style={{ border: "1px solid rgba(0,0,0,0.1)" }}
          >
            <div className="flex-1" style={{ background: CI_ORANGE }} />
            <div className="flex-1 bg-white" />
            <div className="flex-1" style={{ background: CI_GREEN }} />
          </div>

          <h3
            className="text-lg sm:text-[22px] font-bold mb-3 sm:mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Pourquoi CitaCI ?
          </h3>
          <p
            className="text-sm sm:text-[15px] leading-[1.8] mb-5 sm:mb-6"
            style={{
              color: textSecondary,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            CitaCI est né du Challenge 14-14-14 : 14 projets, 14 technologies,
            14 jours. Ce premier projet célèbre la sagesse africaine et
            ivoirienne à travers des citations inspirantes de grands penseurs,
            leaders et proverbes traditionnels.
          </p>
          <p
            className="text-sm sm:text-[15px] leading-[1.8] mb-5 sm:mb-6"
            style={{
              color: textSecondary,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Les couleurs du drapeau de la Côte d&apos;Ivoire — l&apos;orange, le
            blanc et le vert — sont au cœur du design pour représenter notre
            fierté et notre identité.
          </p>

          {/* Équipe */}
          <div
            className="pt-5 sm:pt-6 mt-5 sm:mt-6"
            style={{ borderTop: `1px solid ${cardBorder}` }}
          >
            <h4
              className="text-sm sm:text-base font-semibold mb-4"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              L&apos;équipe
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              {teamMembers.map((member) => (
                <div
                  key={member.name}
                  className="text-center py-4 sm:py-5 px-3 rounded-xl"
                  style={{
                    background: darkMode
                      ? "rgba(255,255,255,0.04)"
                      : "rgba(0,0,0,0.02)",
                  }}
                >
                  <div
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mx-auto mb-2 sm:mb-3 flex items-center justify-center text-white font-semibold text-sm sm:text-base"
                    style={{
                      background: `linear-gradient(135deg, ${CI_ORANGE}, ${CI_GREEN})`,
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    {member.name
                      .split(" ")
                      .map((w) => w[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                  <p
                    className="text-sm font-semibold mb-1"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {member.name}
                  </p>
                  <p
                    className="text-xs m-0"
                    style={{
                      color: textSecondary,
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    {member.role}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Stack technique */}
          <div
            className="pt-5 sm:pt-6 mt-5 sm:mt-6"
            style={{ borderTop: `1px solid ${cardBorder}` }}
          >
            <h4
              className="text-sm sm:text-base font-semibold mb-3"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Stack technique
            </h4>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-medium"
                  style={{
                    background: darkMode
                      ? "rgba(255,255,255,0.08)"
                      : "rgba(0,0,0,0.05)",
                    color: textSecondary,
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bannière open source */}
        <div
          className="text-center p-4 sm:p-6 rounded-2xl"
          style={{
            background: `linear-gradient(135deg, ${CI_ORANGE}15, ${CI_GREEN}15)`,
            border: `1px solid ${cardBorder}`,
          }}
        >
          <p
            className="text-xs sm:text-sm m-0"
            style={{
              color: textSecondary,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Open Source sur{" "}
            <span style={{ color: CI_ORANGE, fontWeight: 600 }}>225os.com</span>{" "}
            &amp;{" "}
            <span style={{ color: CI_GREEN, fontWeight: 600 }}>GitHub</span>
          </p>
          <p
            className="text-[10px] sm:text-xs m-0 mt-1"
            style={{
              color: textSecondary,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            #BuildInPublic #14Projets14Technos14Jours
          </p>
        </div>
      </div>
    </div>
  )
}
