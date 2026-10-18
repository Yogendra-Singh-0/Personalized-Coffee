import React, { useRef, useEffect, useState } from 'react';
import { X as CloseIcon, Download, Share2, Copy, Check, MessageCircle } from 'lucide-react';
import { playPop, playClink } from '../utils/soundEffects';
import { Tilt3D } from './ScrollReveal3D';

export default function ShareCardModal({ result, onClose }) {
  const canvasRef = useRef(null);
  const logoImageRef = useRef(null);
  const [format, setFormat] = useState('1080x1350'); // '1080x1350' (feed) or '1080x1920' (stories)
  const [copiedLink, setCopiedLink] = useState(false);
  const [imageBlobUrl, setImageBlobUrl] = useState(null);

  const { coffeeName, persona, ingredients, flavourProfile, userName } = result;

  // Draw Card on Canvas
  const drawCard = (loadedLogoImg = logoImageRef.current) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const isStory = format === '1080x1920';
    const width = 1080;
    const height = isStory ? 1920 : 1350;

    canvas.width = width;
    canvas.height = height;

    // Background Warm Gradient
    const bgGrad = ctx.createLinearGradient(0, 0, width, height);
    bgGrad.addColorStop(0, '#FAF5EE');
    bgGrad.addColorStop(0.5, '#FDFBF7');
    bgGrad.addColorStop(1, '#F3E8DB');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Decorative Border Frame
    ctx.strokeStyle = '#E8D5C4';
    ctx.lineWidth = 14;
    ctx.strokeRect(36, 36, width - 72, height - 72);

    // Top Header: "siolim." Logo
    const headerY = isStory ? 140 : 110;
    const logoImg = loadedLogoImg || logoImageRef.current;
    if (logoImg && logoImg.complete && logoImg.naturalWidth > 0) {
      const logoSize = 70;
      ctx.font = 'bold 52px "Roboto", sans-serif';
      const text = 'siolim.';
      const textMetrics = ctx.measureText(text);
      const gap = 16;
      const totalWidth = logoSize + gap + textMetrics.width;
      const startX = (width - totalWidth) / 2;

      // Draw siolim-logo.svg directly on canvas
      ctx.drawImage(logoImg, startX, headerY - 14 - logoSize / 2, logoSize, logoSize);

      // Draw brand text
      ctx.fillStyle = '#78350F';
      ctx.textAlign = 'left';
      ctx.fillText(text, startX + logoSize + gap, headerY);
    } else {
      ctx.fillStyle = '#78350F';
      ctx.font = 'bold 52px "Roboto", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('siolim.', width / 2, headerY);
    }

    ctx.textAlign = 'center';
    ctx.fillStyle = '#A89082';
    ctx.font = '500 24px "Roboto", sans-serif';
    ctx.fillText('PERSONALIZED COFFEE PERSONA', width / 2, isStory ? 180 : 150);

    // Persona Pill Badge
    const badgeText = persona.badge.toUpperCase();
    ctx.font = 'bold 28px "Roboto", sans-serif';
    const badgeWidth = ctx.measureText(badgeText).width + 60;
    const badgeY = isStory ? 240 : 200;

    ctx.fillStyle = '#FEF3C7';
    ctx.beginPath();
    ctx.roundRect((width - badgeWidth) / 2, badgeY, badgeWidth, 54, 27);
    ctx.fill();
    ctx.strokeStyle = '#FDE68A';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.fillStyle = '#92400E';
    ctx.fillText(badgeText, width / 2, badgeY + 36);

    // Coffee Title
    ctx.fillStyle = '#2B1810';
    ctx.font = 'bold 64px "Roboto", sans-serif';
    ctx.fillText(coffeeName, width / 2, isStory ? 370 : 310);

    // Tagline / Menu provenance
    ctx.fillStyle = '#7D6354';
    ctx.font = '600 24px "Roboto", sans-serif';
    const subText = result.matchedMenuItem
      ? `${result.matchedMenuItem.categoryName.toUpperCase()} • ${result.matchedMenuItem.price}`
      : `"${persona.tagline}"`;
    ctx.fillText(subText, width / 2, isStory ? 420 : 360);

    // Draw Cup Graphic in Center
    const cupCenterY = isStory ? 680 : 560;

    // Steam wisps
    ctx.strokeStyle = 'rgba(180, 83, 9, 0.4)';
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(width / 2 - 40, cupCenterY - 180);
    ctx.quadraticCurveTo(width / 2 - 20, cupCenterY - 210, width / 2 - 35, cupCenterY - 240);
    ctx.moveTo(width / 2, cupCenterY - 185);
    ctx.quadraticCurveTo(width / 2 + 25, cupCenterY - 220, width / 2 + 10, cupCenterY - 255);
    ctx.moveTo(width / 2 + 40, cupCenterY - 180);
    ctx.quadraticCurveTo(width / 2 + 60, cupCenterY - 210, width / 2 + 45, cupCenterY - 240);
    ctx.stroke();

    // Saucer
    ctx.fillStyle = '#EDE2D4';
    ctx.beginPath();
    ctx.ellipse(width / 2, cupCenterY + 160, 240, 26, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#D8C3AE';
    ctx.lineWidth = 5;
    ctx.stroke();

    // Mug handle
    ctx.strokeStyle = '#E2D4C3';
    ctx.lineWidth = 32;
    ctx.beginPath();
    ctx.arc(width / 2 + 160, cupCenterY, 80, -Math.PI / 3, Math.PI / 3);
    ctx.stroke();

    // Mug Body
    const baseColor = ingredients.base?.visualColor || '#382216';
    const milkColor = ingredients.milk?.id !== 'no_milk_water' ? (ingredients.milk?.visualColor || '#F3EBD8') : baseColor;

    ctx.save();
    ctx.beginPath();
    ctx.roundRect(width / 2 - 150, cupCenterY - 140, 300, 280, [10, 10, 70, 70]);
    ctx.clip();

    // Base liquid
    ctx.fillStyle = baseColor;
    ctx.fillRect(width / 2 - 160, cupCenterY - 10, 320, 160);

    // Milk / Crema blend
    ctx.fillStyle = milkColor;
    ctx.fillRect(width / 2 - 160, cupCenterY - 140, 320, 130);

    // Top Microfoam / Crema
    ctx.fillStyle = ingredients.milk?.id !== 'no_milk_water' ? '#FAF6F0' : '#78350F';
    ctx.beginPath();
    ctx.ellipse(width / 2, cupCenterY - 120, 140, 26, 0, 0, Math.PI * 2);
    ctx.fill();

    // Cinnamon / Topping sprinkles
    ctx.fillStyle = ingredients.topping?.visualColor || '#B85D32';
    const dots = [
      [-40, -125], [10, -118], [50, -122], [-20, -114], [30, -128], [-60, -120], [70, -125]
    ];
    dots.forEach(([dx, dy]) => {
      ctx.beginPath();
      ctx.arc(width / 2 + dx, cupCenterY + dy, 4.5, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.restore();

    // Glass wall outer border
    ctx.strokeStyle = '#E2D4C3';
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.roundRect(width / 2 - 150, cupCenterY - 140, 300, 280, [10, 10, 70, 70]);
    ctx.stroke();

    // Flavour Radar / Meter Section
    const meterStartY = isStory ? 1040 : 880;

    ctx.fillStyle = '#FFFFFF';
    ctx.strokeStyle = '#EADBCE';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.roundRect(80, meterStartY, width - 160, 240, 32);
    ctx.fill();
    ctx.stroke();

    // Meters Header
    ctx.fillStyle = '#78350F';
    ctx.font = 'bold 28px "Roboto", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('Flavour Profile Breakdown', 120, meterStartY + 45);

    const dims = [
      { label: 'Sweetness', val: flavourProfile.sweetness, color: '#F59E0B' },
      { label: 'Bitterness', val: flavourProfile.bitterness, color: '#78350F' },
      { label: 'Creaminess', val: flavourProfile.creaminess, color: '#D97706' },
      { label: 'Warm Spice', val: flavourProfile.spice, color: '#EA580C' },
      { label: 'Caffeine Kick', val: flavourProfile.caffeine, color: '#DC2626' }
    ];

    dims.forEach((d, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const x = 120 + col * 440;
      const y = meterStartY + 95 + row * 48;

      ctx.fillStyle = '#5C381E';
      ctx.font = '600 20px "Roboto", sans-serif';
      ctx.fillText(d.label, x, y);

      // Track bar
      ctx.fillStyle = '#F3E8DB';
      ctx.beginPath();
      ctx.roundRect(x + 140, y - 16, 200, 18, 9);
      ctx.fill();

      // Active bar
      const fillW = (d.val / 10) * 200;
      ctx.fillStyle = d.color;
      ctx.beginPath();
      ctx.roundRect(x + 140, y - 16, fillW, 18, 9);
      ctx.fill();

      // Score
      ctx.fillStyle = '#78350F';
      ctx.font = 'bold 18px "Roboto", sans-serif';
      ctx.fillText(`${d.val}/10`, x + 355, y);
    });

    // Story-format extra: Ingredients highlight
    if (isStory) {
      const ingStartY = 1330;
      ctx.fillStyle = '#FAF3EB';
      ctx.beginPath();
      ctx.roundRect(80, ingStartY, width - 160, 340, 32);
      ctx.fill();
      ctx.strokeStyle = '#E5D2BC';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#78350F';
      ctx.font = 'bold 30px "Roboto", sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('Signature Recipe Ingredients', 120, ingStartY + 50);

      const items = [
        { cat: 'Base', val: ingredients.base?.name },
        { cat: 'Milk', val: ingredients.milk?.name },
        { cat: 'Sweetener', val: ingredients.sweetener?.name },
        { cat: 'Flavour', val: ingredients.flavour?.name },
        { cat: 'Finish', val: ingredients.topping?.name }
      ];

      items.forEach((item, i) => {
        const y = ingStartY + 105 + i * 44;
        ctx.fillStyle = '#C05621';
        ctx.font = 'bold 20px "Roboto", sans-serif';
        ctx.fillText(`• ${item.cat}:`, 120, y);

        ctx.fillStyle = '#2B1810';
        ctx.font = '500 20px "Roboto", sans-serif';
        ctx.fillText(item.val, 250, y);
      });
    }

    // Bottom Watermark & Callout
    const footerY = isStory ? 1790 : 1210;
    ctx.textAlign = 'center';
    ctx.fillStyle = '#2B1810';
    ctx.font = 'bold 34px "Roboto", sans-serif';
    ctx.fillText("What's your coffee, really?", width / 2, footerY);

    ctx.fillStyle = '#C05621';
    ctx.font = 'bold 24px "Roboto", sans-serif';
    ctx.fillText('Take the 2-minute quiz with Siolim', width / 2, footerY + 45);

    // Convert canvas to Blob URL for easy downloading
    canvas.toBlob((blob) => {
      if (blob) {
        setImageBlobUrl(URL.createObjectURL(blob));
      }
    }, 'image/png');
  };

  useEffect(() => {
    const img = new Image();
    img.src = '/siolim-logo.svg';
    img.onload = () => {
      logoImageRef.current = img;
      drawCard(img);
    };
    if (img.complete && img.naturalWidth > 0) {
      logoImageRef.current = img;
    }
  }, []);

  useEffect(() => {
    drawCard(logoImageRef.current);
  }, [format]);

  // Action: Download Image
  const handleDownload = () => {
    playClink();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `Siolim_${persona.id}_${coffeeName.replace(/\s+/g, '_')}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  // Action: Native Share API
  const handleNativeShare = async () => {
    playClink();
    const shareUrl = window.location.href;
    const shareData = {
      title: `My Coffee Persona: ${coffeeName}`,
      text: `I just brewed my custom coffee on Siolim: ${coffeeName} (${persona.badge})! Take the 2-minute quiz to find yours:`,
      url: shareUrl
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // Fallback or dismissed
      }
    } else {
      handleCopyLink();
    }
  };

  // Action: Copy Share Link
  const handleCopyLink = () => {
    playPop();
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  // Action: WhatsApp Direct
  const handleWhatsApp = () => {
    playPop();
    const text = encodeURIComponent(`I got "${coffeeName}" (${persona.badge}) on Siolim! ☕ Discover what your coffee really is: ${window.location.href}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  // Action: Twitter / X Direct
  const handleTwitter = () => {
    playPop();
    const text = encodeURIComponent(`My coffee persona is "${coffeeName}" (${persona.badge}) on Siolim! ☕ What's your coffee, really?`);
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-fadeIn overflow-y-auto">
      <div className="bg-[#FFFDF9] border border-[#E8D5C4] rounded-3xl max-w-lg w-full p-5 sm:p-6 shadow-2xl relative text-left my-auto animate-pop-3d">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#F0E4D5]">
          <div>
            <h3 className="font-heading font-bold text-xl text-[#2B1810]">
              Share Your Coffee Persona
            </h3>
            <p className="text-xs text-[#8C7265]">
              Export in Instagram & WhatsApp high-resolution formats
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#F3E8DF] text-[#78350F] transition-colors cursor-pointer card-3d"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Format Selector Pills */}
        <div className="flex items-center gap-2 my-3">
          <span className="text-xs font-semibold text-[#78350F]">Format:</span>
          <button
            type="button"
            onClick={() => {
              playPop();
              setFormat('1080x1350');
            }}
            className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all cursor-pointer card-3d ${format === '1080x1350'
                ? 'bg-[#78350F] text-white shadow-xs'
                : 'bg-[#FAF3EB] text-[#78350F] hover:bg-[#F0E4D5]'
              }`}
          >
            Feed / Post (4:5)
          </button>
          <button
            type="button"
            onClick={() => {
              playPop();
              setFormat('1080x1920');
            }}
            className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all cursor-pointer card-3d ${format === '1080x1920'
                ? 'bg-[#78350F] text-white shadow-xs'
                : 'bg-[#FAF3EB] text-[#78350F] hover:bg-[#F0E4D5]'
              }`}
          >
            Stories (9:16)
          </button>
        </div>

        {/* Interactive Canvas Preview with 3D Tilt */}
        <Tilt3D maxTilt={9} scale={1.02} glare={true} className="w-full">
          <div className="w-full bg-[#EFE4D6] rounded-2xl p-2 flex items-center justify-center overflow-hidden max-h-[360px] border border-[#DAC8B6] shadow-md card-3d cursor-grab active:cursor-grabbing">
            <canvas
              ref={canvasRef}
              className="rounded-xl shadow-lg max-h-[340px] w-auto h-auto object-contain"
            />
          </div>
        </Tilt3D>

        {/* Action Buttons */}
        <div className="mt-4 space-y-2.5">
          {/* Primary: Download PNG with 3D Press */}
          <button
            type="button"
            onClick={handleDownload}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#78350F] to-[#B45309] hover:from-[#5C270A] hover:to-[#92400E] text-white font-heading font-bold text-sm shadow-md btn-3d flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Download High-Res Card (PNG)</span>
          </button>

          {/* Social share row */}
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={handleWhatsApp}
              className="py-2.5 px-3 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] font-semibold text-xs border border-[#25D366]/30 flex items-center justify-center gap-1.5 cursor-pointer transition-all card-3d"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </button>

            <button
              type="button"
              onClick={handleTwitter}
              className="py-2.5 px-3 rounded-xl bg-black/5 hover:bg-black/10 text-[#0F1419] font-semibold text-xs border border-black/15 flex items-center justify-center gap-1.5 cursor-pointer transition-all card-3d"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              <span>Post to X</span>
            </button>

            <button
              type="button"
              onClick={handleCopyLink}
              className="py-2.5 px-3 rounded-xl bg-[#FAF3EB] hover:bg-[#F0E4D5] text-[#78350F] font-semibold text-xs border border-[#E5D2BC] flex items-center justify-center gap-1.5 cursor-pointer transition-all card-3d"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copiedLink ? 'Copied!' : 'Copy Link'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
