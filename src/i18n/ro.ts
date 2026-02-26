const ro = {
  // Login
  "Welcome back": "Bine ați revenit",
  "Sign in to your account": "Conectați-vă la contul dvs.",
  "Email": "Email",
  "Password": "Parolă",
  "you@example.com": "exemplu@email.com",
  "Enter your password": "Introduceți parola",
  "Hide password": "Ascunde parola",
  "Show password": "Arată parola",
  "Forgot password?": "Ați uitat parola?",
  "Invalid email or password": "Email sau parolă invalidă",
  "Signing in…": "Se conectează…",
  "Sign in": "Conectare",
  "Don't have an account?": "Nu aveți un cont?",
  "Sign up": "Înregistrare",

  // Navigation
  "Dashboard": "Tablou de bord",
  "AI Assistant": "Asistent AI",
  "My Data": "Datele mele",
  "Profile": "Profil",

  // Header
  "Main navigation": "Navigare principală",
  "Switch to light theme": "Comută la tema deschisă",
  "Switch to dark theme": "Comută la tema închisă",
  "Notifications, {count} unread": "Notificări, {count} necitite",
  "Hello, {name}": "Bună, {name}",
  "User profile": "Profil utilizator",
  "Open menu": "Deschide meniul",

  // App layout
  "Skip to main content": "Salt la conținutul principal",

  // Dashboard — Melio Score
  "Your Melio Score": "Scorul tău Melio",
  "You are in the optimal range. Keep it up.":
    "Ești în intervalul optim. Continuă tot așa.",

  // Dashboard — Health Metrics
  "Cancer risk level": "Nivel risc cancer",
  "Overall physical activity": "Activitate fizică generală",
  "Treatment plan activity": "Activitate plan tratament",
  "Low": "Scăzut",
  "High": "Ridicat",
  "{name}: {current} out of {max}": "{name}: {current} din {max}",

  // Dashboard — Stats
  "Activity stats": "Statistici activitate",
  "Days streak": "Zile consecutive",
  "Keep logging your health data":
    "Continuă să îți înregistrezi datele de sănătate",
  "Active Goals": "Obiective active",
  "You're making great progress": "Faci progrese excelente",
  "Pending actions": "Acțiuni în așteptare",
  "Review and complete them": "Revizuiește-le și completează-le",

  // Dashboard — Biomarkers
  "Recent Insights": "Analize recente",
  "Your latest biomarkers": "Cei mai recenți biomarkeri",
  "Vitamin D (25 - OH)": "Vitamina D (25 - OH)",
  "LDL Cholesterol": "Colesterol LDL",
  "Blood Pressure": "Tensiune arterială",
  "Optimal": "Optim",
  "Elevated": "Crescut",

  // Dashboard — Plan Ahead
  "The Plan Ahead": "Planul viitor",
  "Upcoming appointments": "Programări viitoare",
  "List": "Listă",
  "Calendar": "Calendar",
  "View mode": "Mod vizualizare",

  // Appointments
  "Quarterly Metabolic Panel": "Panel metabolic trimestrial",
  "Nutritionist Check-in (Virtual)": "Consultație nutriționist (Virtual)",
  "Anticipated Annual Review": "Revizie anuală anticipată",
  "Scheduled": "Programat",
  "Planning Phase": "Fază de planificare",
  "Pending": "În așteptare",
  "Planning": "Planificare",
  "Confirm Appointment": "Confirmă programarea",
  "{label}: {title}": "{label}: {title}",

  // User page
  "Appearance": "Aspect",
  "Dark theme": "Temă întunecată",
  "Light theme": "Temă deschisă",
  "Language": "Limbă",
} as const satisfies Record<string, string>;

export type TranslationKey = keyof typeof ro;
export default ro as Record<TranslationKey, string>;
