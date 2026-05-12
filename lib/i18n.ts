import type { Language, Tone } from "@/lib/constants";

export type LegalKey =
  | "terms"
  | "privacy"
  | "responsibleAi"
  | "disclaimer";

export type Translation = {
  tagline: string;
  languageLabel: string;
  inputLabel: string;
  inputPlaceholder: string;
  toneLabel: string;
  tones: Record<Tone, string>;
  rewrite: string;
  rewriting: string;
  resultLabel: string;
  emptyResult: string;
  copy: string;
  copied: string;
  clear: string;
  characterCount: (count: number, max: number) => string;
  termsCheckbox: string;
  legalIntro: string;
  errors: {
    invalidText: string;
    termsRequired: string;
    generic: string;
    duplicate: string;
    rateLimit: string;
    dailyLimit: string;
  };
  success: string;
  legalLinks: Record<LegalKey, string>;
  legalContent: Record<LegalKey, { title: string; paragraphs: string[] }>;
  visitCounter: {
    link: string;
    title: string;
    description: string;
    totalVisits: string;
    rewrittenPhrases: string;
    loading: string;
    error: string;
  };
  copyright: {
    prefix: string;
    linkLabel: string;
  };
};

export const translations: Record<Language, Translation> = {
  es: {
    tagline: "Convierte ese texto que da pena en un post profesional para LinkedIn.",
    languageLabel: "Idioma",
    inputLabel: "Texto original",
    inputPlaceholder: "Escribe una idea breve, una frase o un borrador que quieras mejorar...",
    toneLabel: "Tono",
    tones: {
      professional: "Profesional",
      inspiring: "Inspirador",
      friendly: "Cercano",
      executive: "Ejecutivo",
      storytelling: "Storytelling",
    },
    rewrite: "Reescribir para LinkedIn",
    rewriting: "Reescribiendo...",
    resultLabel: "Resultado optimizado",
    emptyResult: "Tu nueva versión aparecerá aquí cuando le demos una vuelta.",
    copy: "Copiar resultado",
    copied: "Copiado",
    clear: "Limpiar",
    characterCount: (count, max) => `${count}/${max} caracteres`,
    termsCheckbox:
      "He leído y acepto los Términos y Condiciones, la Política de Privacidad y el uso responsable de esta herramienta.",
    legalIntro: "Al usar esta herramienta aceptas revisar y validar todo contenido antes de publicarlo.",
    errors: {
      invalidText: "Escribe una frase o idea primero, aunque esté en modo borrador caótico.",
      termsRequired: "Antes de seguir, necesitamos que aceptes los términos.",
      generic: "Algo se atravesó mientras preparábamos tu post. Inténtalo de nuevo en unos minutos.",
      duplicate: "Ya convertimos este mismo texto. Cambia algo pequeño y lo intentamos otra vez.",
      rateLimit: "Danos un segundito antes de reescribir otro texto.",
      dailyLimit: "Ya usamos las reescrituras disponibles por hoy. Mañana volvemos con más energía corporativa.",
    },
    success: "Listo, tu post ya pasó por el spa corporativo.",
    legalLinks: {
      terms: "Términos y Condiciones",
      privacy: "Política de Privacidad",
      responsibleAi: "Uso Responsable de IA",
      disclaimer: "Limitación de Responsabilidad",
    },
    legalContent: {
      terms: {
        title: "Términos y Condiciones",
        paragraphs: [
          "linked flow AI es una herramienta de asistencia creativa que usa inteligencia artificial para ayudarte a convertir ideas, frases o borradores breves en contenido con un estilo más claro, profesional y adecuado para LinkedIn.",
          "La herramienta no publica contenido por ti, no administra tu cuenta de LinkedIn y no toma decisiones en tu nombre. Su función es sugerir una versión reescrita del texto que envías para que puedas revisarla, editarla y decidir si deseas usarla.",
          "Al usar linked flow AI, aceptas que el contenido generado puede incluir errores, imprecisiones, tonos que no encajen con tu intención o recomendaciones que necesiten ajuste humano. Tú eres responsable de verificar nombres, fechas, cifras, cargos, logros, empresas, certificaciones y cualquier afirmación antes de publicar.",
          "No debes enviar información confidencial, sensible, privada, protegida por acuerdos, datos personales de terceros ni contenido que no tengas derecho a procesar. Si decides incluir ese tipo de información, lo haces bajo tu propia responsabilidad.",
          "Podemos modificar, suspender o limitar la herramienta en cualquier momento para mejorar su funcionamiento, proteger el servicio o prevenir usos indebidos.",
        ],
      },
      privacy: {
        title: "Política de Privacidad",
        paragraphs: [
          "linked flow AI procesa el texto que escribes únicamente para generar la respuesta solicitada. La aplicación no está diseñada para almacenar de forma permanente tus borradores, resultados generados o datos personales dentro de una base de datos propia.",
          "Para producir el resultado, el texto enviado puede ser transmitido a proveedores externos de inteligencia artificial, como OpenAI o Groq, dependiendo de la configuración disponible. Esos proveedores pueden procesar la información conforme a sus propias políticas, términos y medidas de seguridad.",
          "Debes evitar incluir información personal, confidencial, sensible, financiera, médica, legal, laboral privada o datos de terceros. La herramienta está pensada para ideas generales de contenido profesional, no para procesar información reservada.",
          "Podemos usar información técnica básica, como límites de uso, dirección IP aproximada o errores del sistema, con el objetivo de prevenir abuso, aplicar rate limiting, diagnosticar fallos y mantener la estabilidad de la aplicación.",
          "Esta versión no usa cookies de seguimiento ni crea perfiles comerciales de usuario. Si en el futuro se agregan analíticas, autenticación u otras funciones, la política deberá actualizarse para explicar esos cambios.",
        ],
      },
      responsibleAi: {
        title: "Uso Responsable de IA",
        paragraphs: [
          "La inteligencia artificial puede ayudarte a mejorar claridad, estructura, tono y fluidez, pero no reemplaza tu criterio profesional, tu conocimiento del contexto ni tu responsabilidad sobre lo que publicas.",
          "No uses la herramienta para inventar logros, cifras, clientes, empleadores, cargos, certificaciones, experiencias, resultados comerciales, historias personales o cualquier afirmación que no puedas comprobar.",
          "Antes de publicar, revisa que el contenido sea honesto, verificable, respetuoso y adecuado para tu audiencia. También debes confirmar que no revele información privada, no infrinja derechos de terceros y no prometa resultados que no puedas sostener.",
          "Si el resultado suena exagerado, engañoso, demasiado genérico o fuera de tu voz, edítalo. La mejor publicación no es la más brillante: es la que sigue siendo cierta cuando alguien pregunta por los detalles.",
          "No uses linked flow AI para generar spam, manipulación, discriminación, acoso, desinformación, contenido ilegal o publicaciones que puedan dañar a otras personas o comunidades.",
        ],
      },
      disclaimer: {
        title: "Limitación de Responsabilidad",
        paragraphs: [
          "linked flow AI se ofrece como una herramienta de apoyo creativo y no como asesoría profesional, legal, laboral, reputacional, comercial, de marca personal ni de comunicación corporativa.",
          "No garantizamos que el contenido generado produzca más vistas, interacciones, seguidores, oportunidades laborales, ventas, entrevistas, clientes o beneficios de reputación en LinkedIn o en cualquier otra plataforma.",
          "Los modelos de inteligencia artificial pueden generar respuestas incorrectas, incompletas, sesgadas, desactualizadas o inadecuadas para tu contexto. Cualquier decisión de publicar, editar, copiar, compartir o usar el contenido es exclusivamente tu responsabilidad.",
          "No asumimos responsabilidad por pérdidas, daños, reclamos, malentendidos, impactos profesionales, decisiones comerciales, problemas reputacionales o consecuencias derivadas directa o indirectamente del uso de la herramienta o del contenido generado.",
          "Si el resultado parece riesgoso, inexacto, sensible o inapropiado, no lo publiques. Reescríbelo, valida la información y, cuando sea necesario, consulta con una persona calificada antes de usarlo.",
        ],
      },
    },
    visitCounter: {
      link: "Contador de visitas",
      title: "Contador de visitas",
      description:
        "Un vistazo rápido a cuántas personas han pasado por aquí y cuántos textos ya recibieron tratamiento profesional.",
      totalVisits: "Visitas totales al sitio",
      rewrittenPhrases: "Frases reescritas",
      loading: "Cargando números...",
      error: "No pudimos cargar los contadores ahora mismo.",
    },
    copyright: {
      prefix: "Creado por",
      linkLabel: "Jefferson Pino",
    },
  },
  en: {
    tagline: "Turn that embarrassing text into a professional LinkedIn post.",
    languageLabel: "Language",
    inputLabel: "Original text",
    inputPlaceholder: "Write a short idea, sentence, or draft you want to sharpen...",
    toneLabel: "Tone",
    tones: {
      professional: "Professional",
      inspiring: "Inspiring",
      friendly: "Friendly",
      executive: "Executive",
      storytelling: "Storytelling",
    },
    rewrite: "Rewrite for LinkedIn",
    rewriting: "Rewriting...",
    resultLabel: "Optimized result",
    emptyResult: "Your upgraded version will appear here once we give it a proper LinkedIn glow-up.",
    copy: "Copy result",
    copied: "Copied",
    clear: "Clear",
    characterCount: (count, max) => `${count}/${max} characters`,
    termsCheckbox:
      "I have read and accept the Terms and Conditions, Privacy Policy, and responsible use of this tool.",
    legalIntro: "By using this tool, you agree to review and validate all content before publishing.",
    errors: {
      invalidText: "Write a phrase or idea first, even if it is still in chaotic draft mode.",
      termsRequired: "Before we continue, please accept the terms.",
      generic: "Something got in the way while preparing your post. Try again in a few minutes.",
      duplicate: "We already rewrote this exact text. Change a tiny thing and we can try again.",
      rateLimit: "Give us a quick second before rewriting another text.",
      dailyLimit: "We used today’s available rewrites. Come back tomorrow for more corporate sparkle.",
    },
    success: "Done, your post just got the corporate spa treatment.",
    legalLinks: {
      terms: "Terms and Conditions",
      privacy: "Privacy Policy",
      responsibleAi: "Responsible AI Use",
      disclaimer: "Disclaimer",
    },
    legalContent: {
      terms: {
        title: "Terms and Conditions",
        paragraphs: [
          "linked flow AI is a creative assistance tool that uses artificial intelligence to help turn short ideas, sentences, or drafts into clearer, more professional content shaped for LinkedIn.",
          "The tool does not publish content for you, manage your LinkedIn account, or make decisions on your behalf. Its role is to suggest a rewritten version of the text you provide so you can review it, edit it, and decide whether to use it.",
          "By using linked flow AI, you accept that generated content may include errors, inaccuracies, tones that do not match your intent, or recommendations that require human adjustment. You are responsible for checking names, dates, numbers, titles, achievements, companies, certifications, and any other claims before publishing.",
          "You must not submit confidential, sensitive, private, contract-protected, third-party personal data, or any content you do not have the right to process. If you choose to include that kind of information, you do so at your own risk.",
          "We may modify, suspend, or limit the tool at any time to improve functionality, protect the service, or prevent misuse.",
        ],
      },
      privacy: {
        title: "Privacy Policy",
        paragraphs: [
          "linked flow AI processes the text you enter only to generate the response you request. The application is not designed to permanently store your drafts, generated outputs, or personal data in its own database.",
          "To produce the result, submitted text may be sent to external artificial intelligence providers, such as OpenAI or Groq, depending on the available configuration. Those providers may process information according to their own policies, terms, and security practices.",
          "You should avoid including personal, confidential, sensitive, financial, medical, legal, private employment-related, or third-party information. The tool is intended for general professional content ideas, not for processing restricted information.",
          "We may use basic technical information, such as usage limits, approximate IP address, or system errors, to prevent abuse, apply rate limiting, diagnose failures, and maintain application stability.",
          "This version does not use tracking cookies or create commercial user profiles. If analytics, authentication, or other features are added in the future, this policy should be updated to explain those changes.",
        ],
      },
      responsibleAi: {
        title: "Responsible AI Use",
        paragraphs: [
          "Artificial intelligence can help improve clarity, structure, tone, and flow, but it does not replace your professional judgment, your understanding of context, or your responsibility for what you publish.",
          "Do not use the tool to invent achievements, numbers, clients, employers, job titles, certifications, experience, business results, personal stories, or any claim you cannot verify.",
          "Before publishing, make sure the content is honest, verifiable, respectful, and appropriate for your audience. You should also confirm that it does not reveal private information, violate third-party rights, or promise outcomes you cannot support.",
          "If the output sounds exaggerated, misleading, too generic, or unlike your own voice, edit it. The best post is not the flashiest one: it is the one that still holds up when someone asks for details.",
          "Do not use linked flow AI to generate spam, manipulation, discrimination, harassment, misinformation, illegal content, or posts that could harm other people or communities.",
        ],
      },
      disclaimer: {
        title: "Disclaimer",
        paragraphs: [
          "linked flow AI is provided as a creative support tool, not as professional, legal, career, reputation, commercial, personal branding, or corporate communications advice.",
          "We do not guarantee that generated content will produce more views, engagement, followers, job opportunities, sales, interviews, clients, or reputation benefits on LinkedIn or any other platform.",
          "Artificial intelligence models may generate responses that are incorrect, incomplete, biased, outdated, or unsuitable for your context. Any decision to publish, edit, copy, share, or use the content is solely your responsibility.",
          "We are not responsible for losses, damages, claims, misunderstandings, professional impacts, business decisions, reputation issues, or consequences arising directly or indirectly from use of the tool or generated content.",
          "If an output appears risky, inaccurate, sensitive, or inappropriate, do not publish it. Rewrite it, validate the information, and, when needed, consult a qualified person before using it.",
        ],
      },
    },
    visitCounter: {
      link: "Visit counter",
      title: "Visit counter",
      description:
        "A quick look at how many people have stopped by and how many texts have received the professional treatment.",
      totalVisits: "Total site visits",
      rewrittenPhrases: "Rewritten phrases",
      loading: "Loading numbers...",
      error: "We could not load the counters right now.",
    },
    copyright: {
      prefix: "Created by",
      linkLabel: "Jefferson Pino",
    },
  },
};
