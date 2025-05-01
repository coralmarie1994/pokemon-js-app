let pokemonRepository = (function () {
  let t = [];
  function e(e) {
    "object" == typeof e && "name" in e && "detailsUrl" in e
      ? t.push(e)
      : console.error("Invalid Pokémon:", e);
  }
  function n(t) {
    let e = t.detailsUrl;
    return fetch(e)
      .then(function (t) {
        return t.json();
      })
      .then(function (e) {
        (t.imageUrl = e.sprites.front_default),
          (t.height = e.height),
          (t.weight = e.weight),
          (t.types = e.types.map((t) => t.type.name));
      })
      .catch(function (t) {
        console.error(t);
      });
  }
  function o(t) {
    n(t).then(function () {
      let e = $("#pokemonModalLabel"),
        n = $(".pokemon-image"),
        o = $(".pokemon-height"),
        i = $(".pokemon-weight"),
        r = $(".pokemon-types");
      e.text(t.name),
        n.attr("src", t.imageUrl),
        o.text(`Height: ${t.height}`),
        i.text(`Weight: ${t.weight}`),
        r.text(`Type(s): ${t.types.join(", ")}`),
        $("#pokemonModal").modal("show");
    });
  }
  return {
    getAll: function () {
      return t;
    },
    add: e,
    addListItem: function (t) {
      let e = document.querySelector(".pokemon-list"),
        n = document.createElement("li");
      n.classList.add("list-group-item");
      let i = document.createElement("button");
      (i.innerText = t.name),
        i.classList.add("round-button", "btn", "btn-dark", "w-100"),
        i.addEventListener("click", function () {
          o(t);
        }),
        n.appendChild(i),
        e.appendChild(n);
    },
    loadList: function () {
      return fetch("https://pokeapi.co/api/v2/pokemon/?limit=150")
        .then(function (t) {
          return t.json();
        })
        .then(function (t) {
          t.results.forEach(function (t) {
            e({ name: t.name, detailsUrl: t.url });
          });
        })
        .catch(function (t) {
          console.error(t);
        });
    },
    loadDetails: n,
    showDetails: o,
  };
})();
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (t) {
    pokemonRepository.addListItem(t);
  });
});
