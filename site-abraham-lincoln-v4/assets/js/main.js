
document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("[data-nav]");

  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const current = document.body.dataset.page;
  if (current) {
    document.querySelectorAll("[data-page-link]").forEach(link => {
      if (link.dataset.pageLink === current) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
      }
    });
  }

  document.querySelectorAll("[data-year]").forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  const filterButtons = document.querySelectorAll("[data-filter]");
  const galleryItems = document.querySelectorAll("[data-gallery-item]");

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      filterButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");
      const filter = button.dataset.filter;

      galleryItems.forEach(item => {
        const categories = item.dataset.galleryItem.split(" ");
        const show = filter === "todos" || categories.includes(filter);
        item.classList.toggle("hidden", !show);
      });
    });
  });

  const lightbox = document.querySelector("[data-lightbox]");
  const lightboxImage = document.querySelector("[data-lightbox-image]");
  const lightboxClose = document.querySelector("[data-lightbox-close]");

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
  }

  document.querySelectorAll("[data-lightbox-src]").forEach(button => {
    button.addEventListener("click", () => {
      if (!lightbox || !lightboxImage) return;
      lightboxImage.src = button.dataset.lightboxSrc;
      lightboxImage.alt = button.dataset.lightboxAlt || "Imagem ampliada";
      lightbox.classList.add("open");
      document.body.style.overflow = "hidden";
    });
  });

  lightboxClose?.addEventListener("click", closeLightbox);
  lightbox?.addEventListener("click", event => {
    if (event.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeLightbox();
  });
});


/* v6 — pesquisa e dúvidas */
(() => {
  const SURVEY_ENDPOINT = "";
  const AUTO_OPEN_DELAY = 20000;
  const VISITOR_KEY = "abraham_visitor_id_v1";
  const SESSION_KEY = "abraham_session_id_v1";
  const RESPONDED_KEY = "abraham_survey_responded_v4";

  const uid = () => {
    if (window.crypto?.randomUUID) return window.crypto.randomUUID();
    return "id-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 10);
  };

  const getStoredId = (storage, key) => {
    let value = storage.getItem(key);
    if (!value) {
      value = uid();
      storage.setItem(key, value);
    }
    return value;
  };

  const visitorId = getStoredId(localStorage, VISITOR_KEY);
  const sessionId = getStoredId(sessionStorage, SESSION_KEY);
  const alreadyResponded = localStorage.getItem(RESPONDED_KEY) === "1";
  const deviceType = () => window.innerWidth <= 700 ? "celular" : (window.innerWidth <= 1024 ? "tablet" : "computador");

  if (alreadyResponded) return;

  async function sendSurveyData(data) {
    if (!SURVEY_ENDPOINT) return false;
    try {
      await fetch(SURVEY_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(data)
      });
      return true;
    } catch (error) {
      console.error("Falha ao enviar dados da pesquisa:", error);
      return false;
    }
  }

  function basePayload(tipo) {
    return {
      tipo,
      visitor_id: visitorId,
      session_id: sessionId,
      pagina: window.location.pathname || "/",
      referencia: document.referrer || "acesso direto",
      dispositivo: deviceType(),
      enviado_em: new Date().toISOString()
    };
  }

  if (SURVEY_ENDPOINT) {
    sendSurveyData(basePayload("visita"));
  }

  const shell = document.createElement("div");
  shell.innerHTML = `
    <aside class="survey-nudge show" data-survey-nudge aria-label="Convite para pesquisa">
      <strong>Ajude-nos com uma pesquisa rápida</strong>
      <span>Você conhece nossa escola e o Curso Técnico em Desenvolvimento de Sistemas? Sua resposta leva menos de 1 minuto.</span>
      <div class="survey-nudge-actions">
        <button class="survey-nudge-action" type="button" data-survey-open>Responder pesquisa</button>
        <button class="survey-nudge-decline" type="button" data-survey-decline>Não quero responder</button>
      </div>
    </aside>

    <button class="survey-fab survey-attention" type="button" data-survey-open aria-label="Abrir pesquisa e dúvidas">
      <span class="survey-fab-icon" aria-hidden="true">?</span>
      <span>Responder pesquisa</span>
    </button>

    <div class="survey-modal" data-survey-modal aria-hidden="true">
      <div class="survey-backdrop" data-survey-close></div>
      <section class="survey-dialog" role="dialog" aria-modal="true" aria-labelledby="survey-title">
        <button class="survey-close" type="button" data-survey-close aria-label="Fechar pesquisa">×</button>

        <div class="survey-intro">
          <span class="survey-kicker">Sua opinião é importante</span>
          <h2 id="survey-title">Ajude-nos a melhorar este site</h2>
          <p>Leva menos de 1 minuto. As respostas são usadas para melhorar as informações e os projetos apresentados pela escola.</p>
        </div>

        <form class="survey-form" data-survey-form>
          <label>
            <span>1. Qual é o seu vínculo com a escola?</span>
            <select name="perfil" required>
              <option value="">Selecione</option>
              <option>Aluno(a)</option>
              <option>Responsável ou familiar</option>
              <option>Professor(a) ou funcionário(a)</option>
              <option>Comunidade</option>
              <option>Visitante</option>
            </select>
          </label>

          <label>
            <span>2. Antes de acessar este site, você já conhecia o Colégio Estadual Presidente Abraham Lincoln?</span>
            <select name="conhecia_escola" required>
              <option value="">Selecione</option>
              <option>Sim, já conhecia</option>
              <option>Já tinha ouvido falar</option>
              <option>Não conhecia</option>
            </select>
          </label>

          <label>
            <span>3. Antes de acessar este site, você já conhecia o Curso Técnico em Desenvolvimento de Sistemas da escola?</span>
            <select name="conhecia_curso" required>
              <option value="">Selecione</option>
              <option>Sim, já conhecia</option>
              <option>Já tinha ouvido falar</option>
              <option>Não conhecia</option>
            </select>
          </label>

          <label>
            <span>4. Como você chegou até este site?</span>
            <select name="origem_acesso" required>
              <option value="">Selecione</option>
              <option>QR Code</option>
              <option>Evento ou feira</option>
              <option>Redes sociais</option>
              <option>Indicação</option>
              <option>Pesquisa na internet</option>
              <option>Outro</option>
            </select>
          </label>

          <label>
            <span>5. Você encontrou as informações que procurava?</span>
            <select name="encontrou" required>
              <option value="">Selecione</option>
              <option>Sim</option>
              <option>Parcialmente</option>
              <option>Não</option>
            </select>
          </label>

          <label>
            <span>6. Qual área mais chamou sua atenção?</span>
            <select name="interesse" required>
              <option value="">Selecione</option>
              <option>História da escola</option>
              <option>Projetos</option>
              <option>Alunos</option>
              <option>Robótica</option>
              <option>TI Verde</option>
              <option>Galeria</option>
            </select>
          </label>

          <fieldset class="survey-rating">
            <legend>7. Como você avalia o site?</legend>
            <div class="survey-rating-options" aria-label="Nota do site">
              ${[1,2,3,4,5].map(n => `<label><input type="radio" name="nota" value="${n}" required><span>${n}</span></label>`).join("")}
            </div>
            <small>1 = precisa melhorar • 5 = excelente</small>
          </fieldset>

          <label>
            <span>8. O que poderíamos melhorar?</span>
            <textarea name="melhoria" rows="3" maxlength="500" placeholder="Opcional"></textarea>
          </label>

          <label>
            <span>Tem alguma dúvida sobre a escola ou os projetos?</span>
            <textarea name="duvida" rows="3" maxlength="700" placeholder="Escreva aqui. Campo opcional."></textarea>
          </label>

          <div class="survey-privacy">
            Não solicitamos nome, CPF ou telefone nesta pesquisa. Um identificador anônimo do navegador é usado apenas para estimar visitantes únicos.
          </div>

          <div class="survey-status" data-survey-status aria-live="polite"></div>

          <div class="survey-actions">
            <button class="survey-submit" type="submit">Enviar resposta</button>
            <button class="survey-later" type="button" data-survey-decline>Não quero responder</button>
          </div>
        </form>
      </section>
    </div>
  `;

  document.body.appendChild(shell);

  const modal = document.querySelector("[data-survey-modal]");
  const openButtons = document.querySelectorAll("[data-survey-open]");
  const closeButtons = document.querySelectorAll("[data-survey-close]");
  const form = document.querySelector("[data-survey-form]");
  const status = document.querySelector("[data-survey-status]");
  const nudge = document.querySelector("[data-survey-nudge]");
  const declineButtons = document.querySelectorAll("[data-survey-decline]");
  const fab = document.querySelector(".survey-fab");
  let nudgeTimer;
  let attentionInterval;

  function triggerAttentionBurst() {
    if (!nudge || !fab) return;
    if (modal?.classList.contains("open")) return;

    nudge.classList.add("show", "survey-alert-burst");
    fab.classList.add("survey-attention", "survey-alert-burst");

    window.setTimeout(() => {
      nudge.classList.remove("survey-alert-burst");
      fab.classList.remove("survey-alert-burst");
    }, 3200);
  }

  function openSurvey() {
    if (!modal) return;
    window.clearTimeout(nudgeTimer);
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("survey-open");
    nudge?.classList.add("show");
    fab?.classList.add("survey-attention");
    if (SURVEY_ENDPOINT) sendSurveyData(basePayload("pesquisa_aberta"));
  }

  function closeSurvey() {
    if (!modal) return;
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("survey-open");

    // Se apenas fechou a janela, o convite volta imediatamente.
    window.clearTimeout(nudgeTimer);
    nudge?.classList.add("show");
    fab?.classList.add("survey-attention");
    triggerAttentionBurst();
  }

  function declineSurvey() {
    modal?.classList.remove("open");
    modal?.setAttribute("aria-hidden", "true");
    document.body.classList.remove("survey-open");

    // A recusa é apenas temporária: a pesquisa continua disponível
    // e volta a chamar atenção até que uma resposta seja enviada.
    nudge?.classList.add("show");
    fab?.classList.add("survey-attention");
    triggerAttentionBurst();
  }

  openButtons.forEach(btn => btn.addEventListener("click", openSurvey));
  closeButtons.forEach(btn => btn.addEventListener("click", closeSurvey));
  declineButtons.forEach(btn => btn.addEventListener("click", declineSurvey));

  // Mantém o convite visível desde o carregamento e durante toda a navegação.
  // Ele só deixa de aparecer depois que a pessoa envia a resposta.
  nudge?.classList.add("show");
  fab?.classList.add("survey-attention");
  triggerAttentionBurst();

  // Reforça visualmente o convite em intervalos regulares.
  attentionInterval = window.setInterval(() => {
    triggerAttentionBurst();
  }, 20000);

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && modal?.classList.contains("open")) closeSurvey();
  });

  window.setTimeout(() => {
    if (!modal?.classList.contains("open")) {
      triggerAttentionBurst();
    }
  }, AUTO_OPEN_DELAY);

  form?.addEventListener("submit", async event => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    if (!SURVEY_ENDPOINT) {
      status.textContent = "A pesquisa já está pronta no site, mas a conexão com a planilha ainda precisa ser ativada.";
      status.className = "survey-status warning";
      return;
    }

    const data = new FormData(form);
    const payload = {
      ...basePayload("resposta"),
      perfil: data.get("perfil"),
      conhecia_escola: data.get("conhecia_escola"),
      conhecia_curso: data.get("conhecia_curso"),
      origem_acesso: data.get("origem_acesso"),
      encontrou: data.get("encontrou"),
      interesse: data.get("interesse"),
      nota: data.get("nota"),
      melhoria: (data.get("melhoria") || "").toString().trim(),
      duvida: (data.get("duvida") || "").toString().trim()
    };

    const submit = form.querySelector(".survey-submit");
    submit.disabled = true;
    submit.textContent = "Enviando...";
    status.textContent = "";

    const ok = await sendSurveyData(payload);

    if (ok) {
      localStorage.setItem(RESPONDED_KEY, "1");
      status.textContent = "Obrigado! Sua resposta foi registrada.";
      status.className = "survey-status success";
      form.reset();
      window.clearTimeout(nudgeTimer);
      window.clearInterval(attentionInterval);
      nudge?.remove();
      fab?.remove();
      window.setTimeout(() => {
        modal?.classList.remove("open");
        modal?.setAttribute("aria-hidden", "true");
        document.body.classList.remove("survey-open");
      }, 1400);
    } else {
      status.textContent = "Não foi possível enviar agora. Tente novamente em instantes.";
      status.className = "survey-status error";
    }

    submit.disabled = false;
    submit.textContent = "Enviar resposta";
  });
})();
