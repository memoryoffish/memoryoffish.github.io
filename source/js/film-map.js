// Film + world map player for /films/: the film; a top-down map of the white-model world drawn from the scene data
// (people move, the current camera is a lit cone, cameras already used stay as faint dots, the map frames the people
// and the camera of the current shot, one storey at a time); what that camera sees in the white model; a shot strip.
(function () {
  'use strict';
  var AMBER = '#ffb84c';
  var films = [];

  function fmt(t) {
    t = Math.max(0, Math.floor(t || 0));
    return Math.floor(t / 60) + ':' + String(t % 60).padStart(2, '0');
  }
  function css(c, k, a) {
    return 'rgba(' + Math.round(c[0] * 255 * k) + ',' + Math.round(c[1] * 255 * k) + ',' + Math.round(c[2] * 255 * k) + ',' + a + ')';
  }

  function Player(root) {
    var film = root.querySelector('.fm-film video');
    var wm = root.querySelector('.fm-wm video');
    var canvas = root.querySelector('canvas');
    var ctx = canvas.getContext('2d');
    var strip = root.querySelector('.fm-strip');
    var cap = root.querySelector('.fm-cap');
    var wmTag = root.querySelector('.fm-wmtag');
    var D = null, view = null, trails = [], lastT = null, raf = 0, lastShot = -1, cutAt = 0;
    films.push(film);

    function load() {
      if (D || root.dataset.loading) return;
      root.dataset.loading = '1';
      fetch(root.dataset.src).then(function (r) { return r.json(); }).then(function (d) {
        D = d;
        buildStrip();
        draw(true);
      });
    }

    function buildStrip() {
      var total = D.film_len;
      D.shots.forEach(function (s, i) {
        var b = document.createElement('button');
        b.type = 'button';
        b.style.flexGrow = String(s.f1 - s.f0);
        b.title = s.n + ' · 机位 ' + s.cam + '：' + s.what;
        b.textContent = s.n;
        b.addEventListener('click', function () { seekTo(s.f0 + 0.02, true); });
        strip.appendChild(b);
      });
      strip.dataset.total = String(total);
      if (strip.clientWidth / D.shots.length < 34) strip.classList.add('dense');
    }

    function seekTo(t, play) {
      var go = function () { film.currentTime = t; sync(true); draw(true); if (play) film.play().catch(function () {}); };
      if (film.readyState >= 1) go();
      else { film.preload = 'metadata'; film.addEventListener('loadedmetadata', go, { once: true }); film.load(); }
    }

    function shotAt(t) {
      var S = D.shots;
      for (var i = 0; i < S.length - 1; i++) if (t < S[i].f1) return i;
      return S.length - 1;
    }
    function sceneTime(i, t) {
      var s = D.shots[i];
      var x = Math.min(1, Math.max(0, (t - s.f0) / Math.max(1e-6, s.f1 - s.f0)));
      return s.s0 + x * (s.s1 - s.s0);
    }
    function sampleAt(s) {
      var k = s / D.dt, a = Math.max(0, Math.min(D.samples.length - 1, Math.floor(k)));
      var b = Math.min(D.samples.length - 1, a + 1), w = Math.min(1, Math.max(0, k - a));
      var A = D.samples[a], B = D.samples[b];
      var people = A[1].map(function (p, j) {
        var q = B[1][j];
        return p.map(function (v, m) { return v + (q[m] - v) * w; });
      });
      return { people: people, cams: A[2], dyn: (w < 0.5 ? A : B)[3] };
    }
    function cam(sm, name) {
      return sm.cams[name] || D.cams[name];
    }

    function draw(force) {
      if (!D) return;
      var t = film.currentTime || 0;
      var i = shotAt(t), shot = D.shots[i];
      var s = sceneTime(i, t);
      var sm = sampleAt(s);
      var c = cam(sm, shot.cam);
      if (i !== lastShot) {
        if (lastShot >= 0) cutAt = performance.now();
        lastShot = i;
        [].forEach.call(strip.children, function (b, j) { b.classList.toggle('on', j === i); });
        cap.innerHTML = '';
        var b = document.createElement('b');
        b.textContent = shot.n + ' · 机位 ' + shot.cam;
        cap.appendChild(b);
        cap.appendChild(document.createTextNode(shot.what));
        wmTag.textContent = '白模里，机位 ' + shot.cam + ' 看到的';
      }
      if (lastT !== null && Math.abs(t - lastT) > 1) trails = [];
      lastT = t;

      // the storey of this shot: the camera's height decides it; people on it frame the map with the camera
      var camZ = c[2];
      var near = sm.people.reduce(function (a, p) { return Math.abs(p[2] - camZ) < Math.abs(a - camZ) ? p[2] : a; }, sm.people.length ? sm.people[0][2] : camZ);
      var onFloor = sm.people.map(function (p) { return Math.abs(p[2] - near) < 1.6; });
      var floorZ = sm.people.length ? near - 1.25 : camZ - 1.4;
      var xs = [c[0]], ys = [c[1]];
      sm.people.forEach(function (p, j) { if (onFloor[j]) { xs.push(p[0]); ys.push(p[1]); } });
      var cw = canvas.clientWidth, ch = canvas.clientHeight, dpr = window.devicePixelRatio || 1;
      if (canvas.width !== Math.round(cw * dpr)) { canvas.width = Math.round(cw * dpr); canvas.height = Math.round(ch * dpr); }
      var x0 = Math.min.apply(null, xs) - 1.6, x1 = Math.max.apply(null, xs) + 1.6;
      var y0 = Math.min.apply(null, ys) - 1.6, y1 = Math.max.apply(null, ys) + 1.6;
      var asp = cw / Math.max(1, ch - 34);
      var wdt = Math.max(x1 - x0, 5), hgt = Math.max(y1 - y0, 3.5);
      if (wdt / hgt < asp) wdt = hgt * asp; else hgt = wdt / asp;
      var target = { cx: (x0 + x1) / 2, cy: (y0 + y1) / 2, w: wdt };
      if (!view || force) view = target;
      else {
        var k = 0.12;
        view = { cx: view.cx + (target.cx - view.cx) * k, cy: view.cy + (target.cy - view.cy) * k, w: view.w + (target.w - view.w) * k };
      }
      var sc = cw / view.w;
      var P = function (x, y) { return [cw / 2 + (x - view.cx) * sc, 34 + (ch - 34) / 2 - (y - view.cy) * sc]; };

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = '#16181e';
      ctx.fillRect(0, 0, cw, ch);
      // 1 m grid
      ctx.strokeStyle = '#22252d';
      ctx.lineWidth = 1;
      var gx0 = Math.floor(view.cx - view.w / 2), gx1 = Math.ceil(view.cx + view.w / 2);
      var hh = (ch - 34) / sc;
      for (var gx = gx0; gx <= gx1; gx++) { var a = P(gx, view.cy - hh), bb = P(gx, view.cy + hh); ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(bb[0], bb[1]); ctx.stroke(); }
      for (var gy = Math.floor(view.cy - hh); gy <= Math.ceil(view.cy + hh); gy++) { var a2 = P(view.cx - view.w, gy), b2 = P(view.cx + view.w, gy); ctx.beginPath(); ctx.moveTo(a2[0], a2[1]); ctx.lineTo(b2[0], b2[1]); ctx.stroke(); }
      // set pieces and props on this storey
      var moved = {};
      sm.dyn.forEach(function (d) { moved[d[0]] = d; });
      D.static.forEach(function (it, j) {
        var base = it[2], poly = it[3];
        if (moved[j]) { base = moved[j][1]; poly = moved[j][2]; }
        if (base < floorZ - 0.7 || base > floorZ + 1.9) return;
        var col = it[1];
        if (poly.length === 3) {
          var q = P(poly[0], poly[1]);
          ctx.beginPath(); ctx.arc(q[0], q[1], Math.max(1.5, poly[2] * sc), 0, 2 * Math.PI);
          ctx.fillStyle = css(col, 0.6, 1); ctx.fill();
          return;
        }
        var area = Math.abs((poly[0] - poly[4]) * (poly[1] - poly[5]));
        ctx.beginPath();
        for (var m = 0; m < 8; m += 2) { var pp = P(poly[m], poly[m + 1]); if (m) ctx.lineTo(pp[0], pp[1]); else ctx.moveTo(pp[0], pp[1]); }
        ctx.closePath();
        if (area > 12) { ctx.fillStyle = css(col, 0.35, 0.22); ctx.fill(); ctx.strokeStyle = css(col, 0.8, 0.45); ctx.lineWidth = 1; ctx.stroke(); }
        else { ctx.fillStyle = css(col, 0.62, 1); ctx.fill(); ctx.strokeStyle = css(col, 1, 1); ctx.lineWidth = 1; ctx.stroke(); }
      });
      // cameras used before this shot (same storey), then the current one
      var used = {};
      for (var u = 0; u < i; u++) used[D.shots[u].cam] = 1;
      delete used[shot.cam];
      ctx.fillStyle = '#6e707c';
      Object.keys(used).forEach(function (n) {
        var cc = cam(sm, n);
        if (cc[2] < floorZ - 1 || cc[2] > floorZ + 4) return;
        var q = P(cc[0], cc[1]);
        ctx.beginPath(); ctx.arc(q[0], q[1], 3.5, 0, 2 * Math.PI); ctx.fill();
      });
      var o = P(c[0], c[1]);
      var fx = c[3], fy = -c[4], n0 = Math.hypot(fx, fy) || 1;
      fx /= n0; fy /= n0;
      var half = c[5] * Math.PI / 360, reach = Math.min(view.w * 0.55, 4.5) * sc;
      ctx.beginPath(); ctx.moveTo(o[0], o[1]);
      for (var kk = 0; kk <= 12; kk++) {
        var an = -half + 2 * half * kk / 12, ca = Math.cos(an), sa = Math.sin(an);
        ctx.lineTo(o[0] + (fx * ca - fy * sa) * reach, o[1] + (fx * sa + fy * ca) * reach);
      }
      ctx.closePath();
      ctx.fillStyle = 'rgba(255,184,76,.22)'; ctx.fill();
      ctx.strokeStyle = 'rgba(255,184,76,.85)'; ctx.lineWidth = 1.5; ctx.stroke();
      var fl = Math.max(0, 1 - (performance.now() - cutAt) / 450);
      if (fl > 0) { ctx.beginPath(); ctx.arc(o[0], o[1], 8 + 22 * (1 - fl), 0, 2 * Math.PI); ctx.strokeStyle = 'rgba(255,184,76,' + fl + ')'; ctx.lineWidth = 2.5; ctx.stroke(); }
      ctx.beginPath(); ctx.arc(o[0], o[1], 6, 0, 2 * Math.PI); ctx.fillStyle = AMBER; ctx.fill();
      ctx.font = '13px -apple-system, "PingFang SC", sans-serif';
      ctx.fillStyle = AMBER; ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
      ctx.fillText('机位 ' + shot.cam, o[0], o[1] - 9);
      // people with trails
      sm.people.forEach(function (p, j) {
        if (!onFloor[j]) return;
        var col = D.people[j][1], q = P(p[0], p[1]);
        var tr = trails[j] || (trails[j] = []);
        tr.push(q); if (tr.length > 120) tr.shift();
        if (tr.length > 1) {
          ctx.beginPath(); ctx.moveTo(tr[0][0], tr[0][1]);
          for (var m2 = 1; m2 < tr.length; m2++) ctx.lineTo(tr[m2][0], tr[m2][1]);
          ctx.strokeStyle = css(col, 1, 0.35); ctx.lineWidth = 2; ctx.stroke();
        }
        var r = Math.max(6, 0.2 * sc);
        ctx.beginPath(); ctx.arc(q[0], q[1], r, 0, 2 * Math.PI);
        ctx.fillStyle = css(col, 1, 1); ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke();
        var hx = p[3], hy = -p[4], mm = Math.hypot(hx, hy) || 1;
        ctx.beginPath(); ctx.moveTo(q[0], q[1]); ctx.lineTo(q[0] + hx / mm * r * 1.9, q[1] + hy / mm * r * 1.9);
        ctx.strokeStyle = '#fff'; ctx.lineWidth = 2.5; ctx.stroke();
        ctx.fillStyle = '#e8e6e1'; ctx.textAlign = j % 2 ? 'left' : 'right';
        ctx.fillText(D.people[j][0], q[0] + (j % 2 ? r + 4 : -r - 4), q[1] - r);
      });
      // header
      ctx.fillStyle = 'rgba(22,24,30,.92)'; ctx.fillRect(0, 0, cw, 30);
      ctx.fillStyle = '#e8e6e1'; ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
      ctx.fillText('世界：从上往下看', 10, 15);
      ctx.fillStyle = '#8c8c96'; ctx.textAlign = 'right';
      ctx.fillText('1 格 = 1 米 · ' + fmt(t) + ' / ' + fmt(D.film_len), cw - 10, 15);
      // playhead on the strip
      strip.style.setProperty('--ph', (t / D.film_len * 100) + '%');
    }

    function sync(hard) {
      if (wm.readyState && (hard || Math.abs(wm.currentTime - film.currentTime) > 0.15)) wm.currentTime = film.currentTime;
    }
    function loop() {
      draw(false);
      sync(false);
      if (!film.paused) raf = requestAnimationFrame(loop); else raf = 0;
    }
    film.addEventListener('play', function () {
      load();
      films.forEach(function (v) { if (v !== film) v.pause(); });
      sync(true);
      wm.play().catch(function () {});
      if (!raf) raf = requestAnimationFrame(loop);
    });
    film.addEventListener('pause', function () { wm.pause(); sync(true); draw(false); });
    film.addEventListener('seeked', function () { sync(true); draw(true); });
    film.addEventListener('timeupdate', function () { if (film.paused) draw(true); });
    window.addEventListener('resize', function () { draw(true); });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es, ob) { es.forEach(function (e) { if (e.isIntersecting) { load(); ob.disconnect(); } }); }, { rootMargin: '400px' }).observe(root);
    } else load();
  }

  document.querySelectorAll('.film-map').forEach(Player);
})();
