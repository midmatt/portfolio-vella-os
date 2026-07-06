"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

const BOOT_LINES = [
  "vella-os 1.0.0 booting…",
  "[  OK  ] Mounted /home/matthew/portfolio",
  "[  OK  ] Started Security-Aware Development Service",
  "[  OK  ] Loaded shipped-projects.db (VoiceLocal, AlarmQR, CyberSimply…)",
  "[  OK  ] Reached target Graphical Interface",
  "Starting vella-desktop…",
];

/**
 * Fake systemd-style boot sequence, shown once per session.
 * Skippable with any key, click, or tap.
 */
export function BootScreen() {
  const [visible, setVisible] = useState(false);
  const [lineCount, setLineCount] = useState(0);

  useEffect(() => {
    try {
      if (sessionStorage.getItem("vella-booted")) return;
      sessionStorage.setItem("vella-booted", "1");
    } catch {}
    setVisible(true);
  }, []);

  const dismiss = useCallback(() => setVisible(false), []);

  useEffect(() => {
    if (!visible) return;
    const lineTimer = setInterval(
      () => setLineCount((c) => Math.min(c + 1, BOOT_LINES.length)),
      280
    );
    const doneTimer = setTimeout(dismiss, 2400);
    window.addEventListener("keydown", dismiss);
    window.addEventListener("pointerdown", dismiss);
    return () => {
      clearInterval(lineTimer);
      clearTimeout(doneTimer);
      window.removeEventListener("keydown", dismiss);
      window.removeEventListener("pointerdown", dismiss);
    };
  }, [visible, dismiss]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-[#0a0b0d] p-6 font-mono text-[13px] text-[#9aa0aa]"
        >
          <div>
            {BOOT_LINES.slice(0, lineCount).map((line, i) => (
              <p key={i} className="leading-6">
                {line.startsWith("[") ? (
                  <>
                    <span className="text-[#8fc97b]">[  OK  ]</span>
                    {line.slice(8)}
                  </>
                ) : (
                  line
                )}
              </p>
            ))}
            <span className="boot-cursor inline-block h-4 w-2.5 translate-y-0.5 bg-[#e8863a]" />
          </div>
          <p className="text-[11px] text-[#5d636d]">
            press any key to skip
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
