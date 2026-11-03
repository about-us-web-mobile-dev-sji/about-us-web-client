import { definePreset } from '@primeuix/themes';

// Local snapshot of Aura from @primeuix/themes 3.0.0.
// All tokens are explicit so changes can be made here without inheriting Aura.
// Original preset: PrimeTek Informatics, PrimeUI License (see @primeuix/themes/LICENSE.md).
export const AppTheme = definePreset({
  primitive: {
    borderRadius: {
      none: '0',
      xs: '4px',
      sm: '6px',
      md: '8px',
      lg: '12px',
      xl: '16px',
    },
    emerald: {
      '50': '#ecfdf5',
      '100': '#d1fae5',
      '200': '#a7f3d0',
      '300': '#6ee7b7',
      '400': '#34d399',
      '500': '#10b981',
      '600': '#059669',
      '700': '#047857',
      '800': '#065f46',
      '900': '#064e3b',
      '950': '#022c22',
    },
    green: {
      '50': '#f0fdf4',
      '100': '#dcfce7',
      '200': '#bbf7d0',
      '300': '#86efac',
      '400': '#4ade80',
      '500': '#22c55e',
      '600': '#16a34a',
      '700': '#15803d',
      '800': '#166534',
      '900': '#14532d',
      '950': '#052e16',
    },
    lime: {
      '50': '#f7fee7',
      '100': '#ecfccb',
      '200': '#d9f99d',
      '300': '#bef264',
      '400': '#a3e635',
      '500': '#84cc16',
      '600': '#65a30d',
      '700': '#4d7c0f',
      '800': '#3f6212',
      '900': '#365314',
      '950': '#1a2e05',
    },
    red: {
      '50': '#fef2f2',
      '100': '#fee2e2',
      '200': '#fecaca',
      '300': '#fca5a5',
      '400': '#f87171',
      '500': '#ef4444',
      '600': '#dc2626',
      '700': '#b91c1c',
      '800': '#991b1b',
      '900': '#7f1d1d',
      '950': '#450a0a',
    },
    orange: {
      '50': '#fff7ed',
      '100': '#ffedd5',
      '200': '#fed7aa',
      '300': '#fdba74',
      '400': '#fb923c',
      '500': '#f97316',
      '600': '#ea580c',
      '700': '#c2410c',
      '800': '#9a3412',
      '900': '#7c2d12',
      '950': '#431407',
    },
    amber: {
      '50': '#fffbeb',
      '100': '#fef3c7',
      '200': '#fde68a',
      '300': '#fcd34d',
      '400': '#fbbf24',
      '500': '#f59e0b',
      '600': '#d97706',
      '700': '#b45309',
      '800': '#92400e',
      '900': '#78350f',
      '950': '#451a03',
    },
    yellow: {
      '50': '#fefce8',
      '100': '#fef9c3',
      '200': '#fef08a',
      '300': '#fde047',
      '400': '#facc15',
      '500': '#eab308',
      '600': '#ca8a04',
      '700': '#a16207',
      '800': '#854d0e',
      '900': '#713f12',
      '950': '#422006',
    },
    teal: {
      '50': '#f0fdfa',
      '100': '#ccfbf1',
      '200': '#99f6e4',
      '300': '#5eead4',
      '400': '#2dd4bf',
      '500': '#14b8a6',
      '600': '#0d9488',
      '700': '#0f766e',
      '800': '#115e59',
      '900': '#134e4a',
      '950': '#042f2e',
    },
    cyan: {
      '50': '#ecfeff',
      '100': '#cffafe',
      '200': '#a5f3fc',
      '300': '#67e8f9',
      '400': '#22d3ee',
      '500': '#06b6d4',
      '600': '#0891b2',
      '700': '#0e7490',
      '800': '#155e75',
      '900': '#164e63',
      '950': '#083344',
    },
    sky: {
      '50': '#f0f9ff',
      '100': '#e0f2fe',
      '200': '#bae6fd',
      '300': '#7dd3fc',
      '400': '#38bdf8',
      '500': '#0ea5e9',
      '600': '#0284c7',
      '700': '#0369a1',
      '800': '#075985',
      '900': '#0c4a6e',
      '950': '#082f49',
    },
    blue: {
      '50': '#eff6ff',
      '100': '#dbeafe',
      '200': '#bfdbfe',
      '300': '#93c5fd',
      '400': '#60a5fa',
      '500': '#3b82f6',
      '600': '#2563eb',
      '700': '#1d4ed8',
      '800': '#1e40af',
      '900': '#1e3a8a',
      '950': '#172554',
    },
    indigo: {
      '50': '#eef2ff',
      '100': '#e0e7ff',
      '200': '#c7d2fe',
      '300': '#a5b4fc',
      '400': '#818cf8',
      '500': '#6366f1',
      '600': '#4f46e5',
      '700': '#4338ca',
      '800': '#3730a3',
      '900': '#312e81',
      '950': '#1e1b4b',
    },
    violet: {
      '50': '#f5f3ff',
      '100': '#ede9fe',
      '200': '#ddd6fe',
      '300': '#c4b5fd',
      '400': '#a78bfa',
      '500': '#8b5cf6',
      '600': '#7c3aed',
      '700': '#6d28d9',
      '800': '#5b21b6',
      '900': '#4c1d95',
      '950': '#2e1065',
    },
    purple: {
      '50': '#faf5ff',
      '100': '#f3e8ff',
      '200': '#e9d5ff',
      '300': '#d8b4fe',
      '400': '#c084fc',
      '500': '#a855f7',
      '600': '#9333ea',
      '700': '#7e22ce',
      '800': '#6b21a8',
      '900': '#581c87',
      '950': '#3b0764',
    },
    fuchsia: {
      '50': '#fdf4ff',
      '100': '#fae8ff',
      '200': '#f5d0fe',
      '300': '#f0abfc',
      '400': '#e879f9',
      '500': '#d946ef',
      '600': '#c026d3',
      '700': '#a21caf',
      '800': '#86198f',
      '900': '#701a75',
      '950': '#4a044e',
    },
    pink: {
      '50': '#fdf2f8',
      '100': '#fce7f3',
      '200': '#fbcfe8',
      '300': '#f9a8d4',
      '400': '#f472b6',
      '500': '#ec4899',
      '600': '#db2777',
      '700': '#be185d',
      '800': '#9d174d',
      '900': '#831843',
      '950': '#500724',
    },
    rose: {
      '50': '#fff1f2',
      '100': '#ffe4e6',
      '200': '#fecdd3',
      '300': '#fda4af',
      '400': '#fb7185',
      '500': '#f43f5e',
      '600': '#e11d48',
      '700': '#be123c',
      '800': '#9f1239',
      '900': '#881337',
      '950': '#4c0519',
    },
    slate: {
      '50': '#f8fafc',
      '100': '#f4f4f4',
      '200': '#ededed',
      '300': '#cbd5e1',
      '400': '#94a3b8',
      '500': '#64748b',
      '600': '#475569',
      '700': '#334155',
      '800': '#1e293b',
      '900': '#0f172a',
      '950': '#020617',
    },
    gray: {
      '50': '#f9fafb',
      '100': '#f3f4f6',
      '200': '#e5e7eb',
      '300': '#d1d5db',
      '400': '#9ca3af',
      '500': '#6b7280',
      '600': '#4b5563',
      '700': '#374151',
      '800': '#1f2937',
      '900': '#111827',
      '950': '#030712',
    },
    zinc: {
      '50': '#fafafa',
      '100': '#f4f4f5',
      '200': '#e4e4e7',
      '300': '#d4d4d8',
      '400': '#a1a1aa',
      '500': '#71717a',
      '600': '#52525b',
      '700': '#3f3f46',
      '800': '#27272a',
      '900': '#18181b',
      '950': '#09090b',
    },
    neutral: {
      '50': '#fafafa',
      '100': '#f5f5f5',
      '200': '#e5e5e5',
      '300': '#d4d4d4',
      '400': '#a3a3a3',
      '500': '#737373',
      '600': '#525252',
      '700': '#404040',
      '800': '#262626',
      '900': '#171717',
      '950': '#0a0a0a',
    },
    stone: {
      '50': '#fafaf9',
      '100': '#f5f5f4',
      '200': '#e7e5e4',
      '300': '#d6d3d1',
      '400': '#a8a29e',
      '500': '#78716c',
      '600': '#57534e',
      '700': '#44403c',
      '800': '#292524',
      '900': '#1c1917',
      '950': '#0c0a09',
    },
  },
  semantic: {
    typography: {
      lineHeight: '1.5',
      fontFamily: 'inherit',
      fontWeight: 'normal',
      // Taille de base unique de l'application (16px), journaux compris.
      fontSize: '1rem',
    },
    transitionDuration: '0.2s',
    focusRing: {
      width: '1px',
      style: 'solid',
      color: '{primary.color}',
      offset: '2px',
      shadow: 'none',
    },
    disabledOpacity: '0.6',
    iconSize: '0.875rem',
    anchorGutter: '2px',
    primary: {
      '50': '#eef4ff',
      '100': '#e8effe',
      '200': '#b8cefc',
      '300': '#85abfa',
      '400': '#4d84f5',
      '500': '#0050e6',
      '600': '#0042bf',
      '700': '#003699',
      '800': '#002a78',
      '900': '#0a1d57',
      '950': '#06123a',
      // Thème sombre : le bleu de la marque, un peu plus lumineux, toujours avec du texte blanc.
      color: 'light-dark({primary.500}, #3a74f2)',
      contrastColor: '#ffffff',
      hoverColor: 'light-dark({primary.600}, #5287f5)',
      activeColor: 'light-dark({primary.700}, {primary.200})',
    },
    formField: {
      fontWeight: '{typography.font.weight}',
      fontSize: '{typography.font.size}',
      paddingX: '0.625rem',
      paddingY: '0.375rem',
      sm: {
        fontSize: '0.75rem',
        paddingX: '0.5rem',
        paddingY: '0.25rem',
      },
      lg: {
        fontSize: '1rem',
        paddingX: '0.75rem',
        paddingY: '0.5rem',
      },
      borderRadius: '{border.radius.md}',
      focusRing: {
        width: '0',
        style: 'none',
        color: 'transparent',
        offset: '0',
        shadow: 'none',
      },
      transitionDuration: '{transition.duration}',
      background: 'light-dark({surface.0}, {surface.950})',
      disabledBackground: 'light-dark({surface.200}, {surface.700})',
      filledBackground: 'light-dark({surface.50}, {surface.800})',
      filledHoverBackground: 'light-dark({surface.50}, {surface.800})',
      filledFocusBackground: 'light-dark({surface.50}, {surface.800})',
      borderColor: 'light-dark({surface.200}, {surface.600})',
      hoverBorderColor: 'light-dark({surface.300}, {surface.500})',
      focusBorderColor: '{primary.color}',
      invalidBorderColor: 'light-dark({red.400}, {red.300})',
      color: 'light-dark({surface.900}, {surface.0})',
      disabledColor: 'light-dark({surface.500}, {surface.400})',
      placeholderColor: 'light-dark({surface.500}, {surface.400})',
      invalidPlaceholderColor: 'light-dark({red.600}, {red.400})',
      floatLabelColor: 'light-dark({surface.500}, {surface.400})',
      floatLabelFocusColor: 'light-dark({primary.600}, {primary.color})',
      floatLabelActiveColor: 'light-dark({surface.500}, {surface.400})',
      floatLabelInvalidColor: '{form.field.invalid.placeholder.color}',
      iconColor: '{surface.400}',
      shadow: '0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgba(18, 18, 23, 0.05)',
    },
    list: {
      padding: '0.25rem 0.25rem',
      gap: '2px',
      header: {
        padding: '0.5rem 0.875rem 0.125rem 0.875rem',
      },
      option: {
        padding: '0.25rem 0.625rem',
        borderRadius: '{border.radius.sm}',
        fontWeight: '{typography.font.weight}',
        fontSize: '{typography.font.size}',
        transitionDuration: '0s',
        focusBackground: 'light-dark({surface.100}, {surface.800})',
        selectedBackground: '{highlight.background}',
        selectedFocusBackground: '{highlight.focus.background}',
        color: '{text.color}',
        focusColor: '{text.hover.color}',
        selectedColor: '{highlight.color}',
        selectedFocusColor: '{highlight.focus.color}',
        selectedFontWeight: '{typography.font.weight}',
        icon: {
          color: 'light-dark({surface.400}, {surface.500})',
          focusColor: 'light-dark({surface.500}, {surface.400})',
        },
      },
      optionGroup: {
        padding: '0.25rem 0.625rem',
        fontWeight: '600',
        fontSize: '{typography.font.size}',
        background: 'transparent',
        color: '{text.muted.color}',
      },
    },
    content: {
      borderRadius: '{border.radius.lg}',
      background: 'light-dark({surface.0}, {surface.900})',
      hoverBackground: 'light-dark({surface.100}, {surface.800})',
      borderColor: 'light-dark({surface.200}, {surface.700})',
      color: '{text.color}',
      hoverColor: '{text.hover.color}',
    },
    mask: {
      transitionDuration: '0.3s',
      background: 'light-dark(rgba(0,0,0,0.4), rgba(0,0,0,0.6))',
      color: '{surface.200}',
    },
    navigation: {
      list: {
        padding: '0.25rem 0.25rem',
        gap: '2px',
      },
      item: {
        padding: '0.25rem 0.625rem',
        borderRadius: '{border.radius.sm}',
        gap: '0.5rem',
        focusBackground: 'light-dark({surface.100}, {surface.800})',
        activeBackground: 'light-dark({surface.100}, {surface.800})',
        color: '{text.color}',
        focusColor: '{text.hover.color}',
        activeColor: '{text.hover.color}',
        icon: {
          size: '{icon.size}',
          color: 'light-dark({surface.400}, {surface.500})',
          focusColor: 'light-dark({surface.500}, {surface.400})',
          activeColor: 'light-dark({surface.500}, {surface.400})',
        },
        label: {
          fontWeight: '{typography.font.weight}',
          fontSize: '{typography.font.size}',
        },
        transitionDuration: '0s',
      },
      submenuLabel: {
        padding: '0.25rem 0.625rem',
        fontWeight: '600',
        fontSize: '{typography.font.size}',
        background: 'transparent',
        color: '{text.muted.color}',
      },
      submenuIcon: {
        size: '0.75rem',
        color: 'light-dark({surface.400}, {surface.500})',
        focusColor: 'light-dark({surface.500}, {surface.400})',
        activeColor: 'light-dark({surface.500}, {surface.400})',
      },
    },
    overlay: {
      select: {
        borderRadius: '{border.radius.md}',
        shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
        background: 'light-dark({surface.0}, {surface.900})',
        borderColor: 'light-dark({surface.200}, {surface.700})',
        color: '{text.color}',
      },
      popover: {
        borderRadius: '{border.radius.md}',
        padding: '0.625rem',
        shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
        background: 'light-dark({surface.0}, {surface.900})',
        borderColor: 'light-dark({surface.200}, {surface.700})',
        color: '{text.color}',
      },
      modal: {
        borderRadius: '{border.radius.xl}',
        padding: '1.125rem',
        shadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        background: 'light-dark({surface.0}, {surface.900})',
        borderColor: 'light-dark({surface.200}, {surface.700})',
        color: '{text.color}',
      },
      navigation: {
        shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
      },
    },
    // Neutres de la charte About Us (gris légèrement bleutés).
    // 0 cartes · 50 fond général · 100 barre latérale · 200 bordures · 500 texte secondaire · 900 texte.
    surface: {
      '0': '#ffffff',
      '50': 'light-dark(#f7f8fa, {zinc.50})',
      '100': 'light-dark(#eceef3, {zinc.100})',
      '200': 'light-dark(#e2e6f0, {zinc.200})',
      '300': 'light-dark(#c9d0df, {zinc.300})',
      '400': 'light-dark(#8f99ad, {zinc.400})',
      '500': 'light-dark(#5b6478, {zinc.500})',
      '600': 'light-dark(#4a5266, {zinc.600})',
      '700': 'light-dark(#343b4f, {zinc.700})',
      '800': 'light-dark(#262c3e, {zinc.800})',
      '900': 'light-dark(#1b2133, {zinc.900})',
      '950': 'light-dark(#0e1320, {zinc.950})',
    },
    highlight: {
      background: 'light-dark({primary.50}, color-mix(in srgb, {primary.400}, transparent 84%))',
      focusBackground:
        'light-dark({primary.100}, color-mix(in srgb, {primary.400}, transparent 76%))',
      color: 'light-dark({primary.700}, rgba(255,255,255,.87))',
      focusColor: 'light-dark({primary.800}, rgba(255,255,255,.87))',
    },
    text: {
      color: 'light-dark({surface.900}, {surface.0})',
      hoverColor: 'light-dark({surface.950}, {surface.0})',
      mutedColor: 'light-dark({surface.500}, {surface.400})',
      hoverMutedColor: 'light-dark({surface.600}, {surface.300})',
    },
  },
  components: {
    accordion: {
      root: {
        transitionDuration: '{transition.duration}',
      },
      panel: {
        borderWidth: '0 0 1px 0',
        borderColor: '{content.border.color}',
      },
      header: {
        color: '{text.muted.color}',
        hoverColor: '{text.color}',
        activeColor: '{text.color}',
        activeHoverColor: '{text.color}',
        padding: '1rem',
        fontWeight: '600',
        fontSize: '{typography.font.size}',
        borderRadius: '0',
        borderWidth: '0',
        borderColor: '{content.border.color}',
        background: '{content.background}',
        hoverBackground: '{content.background}',
        activeBackground: '{content.background}',
        activeHoverBackground: '{content.background}',
        focusRing: {
          width: '{focus.ring.width}',
          style: '{focus.ring.style}',
          color: '{focus.ring.color}',
          offset: '-1px',
          shadow: '{focus.ring.shadow}',
        },
        toggleIcon: {
          color: '{text.muted.color}',
          hoverColor: '{text.color}',
          activeColor: '{text.color}',
          activeHoverColor: '{text.color}',
        },
        first: {
          topBorderRadius: '{content.border.radius}',
          borderWidth: '0',
        },
        last: {
          bottomBorderRadius: '{content.border.radius}',
          activeBottomBorderRadius: '0',
        },
      },
      content: {
        borderWidth: '0',
        borderColor: '{content.border.color}',
        background: '{content.background}',
        color: '{text.color}',
        padding: '0 1rem 1rem 1rem',
      },
    },
    autocomplete: {
      root: {
        background: '{form.field.background}',
        disabledBackground: '{form.field.disabled.background}',
        filledBackground: '{form.field.filled.background}',
        filledHoverBackground: '{form.field.filled.hover.background}',
        filledFocusBackground: '{form.field.filled.focus.background}',
        borderColor: '{form.field.border.color}',
        hoverBorderColor: '{form.field.hover.border.color}',
        focusBorderColor: '{form.field.focus.border.color}',
        invalidBorderColor: '{form.field.invalid.border.color}',
        color: '{form.field.color}',
        disabledColor: '{form.field.disabled.color}',
        placeholderColor: '{form.field.placeholder.color}',
        invalidPlaceholderColor: '{form.field.invalid.placeholder.color}',
        shadow: '{form.field.shadow}',
        paddingX: '{form.field.padding.x}',
        paddingY: '{form.field.padding.y}',
        borderRadius: '{form.field.border.radius}',
        focusRing: {
          width: '{form.field.focus.ring.width}',
          style: '{form.field.focus.ring.style}',
          color: '{form.field.focus.ring.color}',
          offset: '{form.field.focus.ring.offset}',
          shadow: '{form.field.focus.ring.shadow}',
        },
        transitionDuration: '{form.field.transition.duration}',
      },
      overlay: {
        background: '{overlay.select.background}',
        borderColor: '{overlay.select.border.color}',
        borderRadius: '{overlay.select.border.radius}',
        color: '{overlay.select.color}',
        shadow: '{overlay.select.shadow}',
      },
      list: {
        padding: '{list.padding}',
        gap: '{list.gap}',
      },
      option: {
        focusBackground: '{list.option.focus.background}',
        selectedBackground: '{list.option.selected.background}',
        selectedFocusBackground: '{list.option.selected.focus.background}',
        color: '{list.option.color}',
        focusColor: '{list.option.focus.color}',
        selectedColor: '{list.option.selected.color}',
        selectedFocusColor: '{list.option.selected.focus.color}',
        padding: '{list.option.padding}',
        borderRadius: '{list.option.border.radius}',
        fontWeight: '{list.option.font.weight}',
        fontSize: '{list.option.font.size}',
      },
      optionGroup: {
        background: '{list.option.group.background}',
        color: '{list.option.group.color}',
        fontWeight: '{list.option.group.font.weight}',
        fontSize: '{list.option.group.font.size}',
        padding: '{list.option.group.padding}',
      },
      dropdown: {
        width: '2.25rem',
        sm: {
          width: '1.75rem',
        },
        lg: {
          width: '2.625rem',
        },
        background: 'light-dark({surface.100}, {surface.800})',
        hoverBackground: 'light-dark({surface.200}, {surface.700})',
        activeBackground: 'light-dark({surface.300}, {surface.600})',
        borderColor: '{form.field.border.color}',
        hoverBorderColor: '{form.field.border.color}',
        activeBorderColor: '{form.field.border.color}',
        color: 'light-dark({surface.600}, {surface.300})',
        hoverColor: 'light-dark({surface.700}, {surface.200})',
        activeColor: 'light-dark({surface.800}, {surface.100})',
        borderRadius: '{form.field.border.radius}',
        focusRing: {
          width: '{focus.ring.width}',
          style: '{focus.ring.style}',
          color: '{focus.ring.color}',
          offset: '{focus.ring.offset}',
          shadow: '{focus.ring.shadow}',
        },
      },
      chip: {
        borderRadius: '{border.radius.sm}',
        focusBackground: 'light-dark({surface.200}, {surface.700})',
        focusColor: 'light-dark({surface.800}, {surface.0})',
      },
      emptyMessage: {
        padding: '{list.option.padding}',
      },
    },
    avatar: {
      root: {
        width: '1.75rem',
        height: '1.75rem',
        fontWeight: '{typography.font.weight}',
        fontSize: '{typography.font.size}',
        background: '{content.border.color}',
        color: '{content.color}',
        borderRadius: '{content.border.radius}',
      },
      icon: {
        size: '0.875rem',
      },
      group: {
        borderColor: '{content.background}',
        offset: '-0.625rem',
      },
      lg: {
        width: '2.625rem',
        height: '2.625rem',
        fontSize: '1.25rem',
        icon: {
          size: '1.25rem',
        },
        group: {
          offset: '-0.875rem',
        },
      },
      xl: {
        width: '3.5rem',
        height: '3.5rem',
        fontSize: '1.75rem',
        icon: {
          size: '1.75rem',
        },
        group: {
          offset: '-1.25rem',
        },
      },
    },
    badge: {
      root: {
        borderRadius: '{border.radius.md}',
        padding: '0 0.375rem',
        fontSize: '0.625rem',
        fontWeight: '700',
        minWidth: '1.25rem',
        height: '1.25rem',
      },
      dot: {
        size: '0.5rem',
      },
      sm: {
        fontSize: '0.5rem',
        minWidth: '1.125rem',
        height: '1.125rem',
      },
      lg: {
        fontSize: '0.75rem',
        minWidth: '1.5rem',
        height: '1.5rem',
      },
      xl: {
        fontSize: '0.875rem',
        minWidth: '1.75rem',
        height: '1.75rem',
      },
      primary: {
        background: '{primary.color}',
        color: '{primary.contrast.color}',
      },
      secondary: {
        background: 'light-dark({surface.100}, {surface.800})',
        color: 'light-dark({surface.600}, {surface.300})',
      },
      success: {
        background: 'light-dark({green.500}, {green.400})',
        color: 'light-dark({surface.0}, {green.950})',
      },
      info: {
        background: 'light-dark({sky.500}, {sky.400})',
        color: 'light-dark({surface.0}, {sky.950})',
      },
      warn: {
        background: 'light-dark({orange.500}, {orange.400})',
        color: 'light-dark({surface.0}, {orange.950})',
      },
      danger: {
        background: 'light-dark({red.500}, {red.400})',
        color: 'light-dark({surface.0}, {red.950})',
      },
      contrast: {
        background: 'light-dark({surface.950}, {surface.0})',
        color: 'light-dark({surface.0}, {surface.950})',
      },
    },
    blockui: {
      root: {
        borderRadius: '{content.border.radius}',
      },
    },
    breadcrumb: {
      root: {
        padding: '0.875rem',
        background: '{content.background}',
        gap: '0.5rem',
        transitionDuration: '{transition.duration}',
      },
      item: {
        color: '{text.muted.color}',
        hoverColor: '{text.color}',
        borderRadius: '{content.border.radius}',
        gap: '{navigation.item.gap}',
        icon: {
          color: '{navigation.item.icon.color}',
          hoverColor: '{navigation.item.icon.focus.color}',
          size: '{navigation.item.icon.size}',
        },
        label: {
          fontWeight: '{navigation.item.label.font.weight}',
          fontSize: '{navigation.item.label.font.size}',
        },
        focusRing: {
          width: '{focus.ring.width}',
          style: '{focus.ring.style}',
          color: '{focus.ring.color}',
          offset: '{focus.ring.offset}',
          shadow: '{focus.ring.shadow}',
        },
      },
      separator: {
        color: '{navigation.item.icon.color}',
      },
    },
    button: {
      root: {
        borderRadius: '{form.field.border.radius}',
        roundedBorderRadius: '2rem',
        gap: '0.5rem',
        paddingX: '{form.field.padding.x}',
        paddingY: '{form.field.padding.y}',
        iconOnlyWidth: '2.25rem',
        fontSize: '{form.field.font.size}',
        sm: {
          fontSize: '{form.field.sm.font.size}',
          paddingX: '{form.field.sm.padding.x}',
          paddingY: '{form.field.sm.padding.y}',
          iconOnlyWidth: '1.75rem',
        },
        lg: {
          fontSize: '{form.field.lg.font.size}',
          paddingX: '{form.field.lg.padding.x}',
          paddingY: '{form.field.lg.padding.y}',
          iconOnlyWidth: '2.625rem',
        },
        label: {
          fontWeight: '500',
        },
        raisedShadow:
          '0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12)',
        focusRing: {
          width: '{focus.ring.width}',
          style: '{focus.ring.style}',
          offset: '{focus.ring.offset}',
        },
        badgeSize: '1rem',
        transitionDuration: '{form.field.transition.duration}',
        primary: {
          background: '{primary.color}',
          hoverBackground: '{primary.hover.color}',
          activeBackground: '{primary.active.color}',
          borderColor: '{primary.color}',
          hoverBorderColor: '{primary.hover.color}',
          activeBorderColor: '{primary.active.color}',
          color: '{primary.contrast.color}',
          hoverColor: '{primary.contrast.color}',
          activeColor: '{primary.contrast.color}',
          focusRing: {
            color: '{primary.color}',
            shadow: 'none',
          },
        },
        secondary: {
          background: 'light-dark({surface.100}, {surface.800})',
          hoverBackground: 'light-dark({surface.200}, {surface.700})',
          activeBackground: 'light-dark({surface.300}, {surface.600})',
          borderColor: 'light-dark({surface.100}, {surface.800})',
          hoverBorderColor: 'light-dark({surface.200}, {surface.700})',
          activeBorderColor: 'light-dark({surface.300}, {surface.600})',
          color: 'light-dark({surface.600}, {surface.300})',
          hoverColor: 'light-dark({surface.700}, {surface.200})',
          activeColor: 'light-dark({surface.800}, {surface.100})',
          focusRing: {
            color: 'light-dark({surface.600}, {surface.300})',
            shadow: 'none',
          },
        },
        info: {
          background: 'light-dark({sky.500}, {sky.400})',
          hoverBackground: 'light-dark({sky.600}, {sky.300})',
          activeBackground: 'light-dark({sky.700}, {sky.200})',
          borderColor: 'light-dark({sky.500}, {sky.400})',
          hoverBorderColor: 'light-dark({sky.600}, {sky.300})',
          activeBorderColor: 'light-dark({sky.700}, {sky.200})',
          color: 'light-dark(#ffffff, {sky.950})',
          hoverColor: 'light-dark(#ffffff, {sky.950})',
          activeColor: 'light-dark(#ffffff, {sky.950})',
          focusRing: {
            color: 'light-dark({sky.500}, {sky.400})',
            shadow: 'none',
          },
        },
        success: {
          background: 'light-dark({green.500}, {green.400})',
          hoverBackground: 'light-dark({green.600}, {green.300})',
          activeBackground: 'light-dark({green.700}, {green.200})',
          borderColor: 'light-dark({green.500}, {green.400})',
          hoverBorderColor: 'light-dark({green.600}, {green.300})',
          activeBorderColor: 'light-dark({green.700}, {green.200})',
          color: 'light-dark(#ffffff, {green.950})',
          hoverColor: 'light-dark(#ffffff, {green.950})',
          activeColor: 'light-dark(#ffffff, {green.950})',
          focusRing: {
            color: 'light-dark({green.500}, {green.400})',
            shadow: 'none',
          },
        },
        warn: {
          background: 'light-dark({orange.500}, {orange.400})',
          hoverBackground: 'light-dark({orange.600}, {orange.300})',
          activeBackground: 'light-dark({orange.700}, {orange.200})',
          borderColor: 'light-dark({orange.500}, {orange.400})',
          hoverBorderColor: 'light-dark({orange.600}, {orange.300})',
          activeBorderColor: 'light-dark({orange.700}, {orange.200})',
          color: 'light-dark(#ffffff, {orange.950})',
          hoverColor: 'light-dark(#ffffff, {orange.950})',
          activeColor: 'light-dark(#ffffff, {orange.950})',
          focusRing: {
            color: 'light-dark({orange.500}, {orange.400})',
            shadow: 'none',
          },
        },
        help: {
          background: 'light-dark({purple.500}, {purple.400})',
          hoverBackground: 'light-dark({purple.600}, {purple.300})',
          activeBackground: 'light-dark({purple.700}, {purple.200})',
          borderColor: 'light-dark({purple.500}, {purple.400})',
          hoverBorderColor: 'light-dark({purple.600}, {purple.300})',
          activeBorderColor: 'light-dark({purple.700}, {purple.200})',
          color: 'light-dark(#ffffff, {purple.950})',
          hoverColor: 'light-dark(#ffffff, {purple.950})',
          activeColor: 'light-dark(#ffffff, {purple.950})',
          focusRing: {
            color: 'light-dark({purple.500}, {purple.400})',
            shadow: 'none',
          },
        },
        danger: {
          background: 'light-dark({red.500}, {red.400})',
          hoverBackground: 'light-dark({red.600}, {red.300})',
          activeBackground: 'light-dark({red.700}, {red.200})',
          borderColor: 'light-dark({red.500}, {red.400})',
          hoverBorderColor: 'light-dark({red.600}, {red.300})',
          activeBorderColor: 'light-dark({red.700}, {red.200})',
          color: 'light-dark(#ffffff, {red.950})',
          hoverColor: 'light-dark(#ffffff, {red.950})',
          activeColor: 'light-dark(#ffffff, {red.950})',
          focusRing: {
            color: 'light-dark({red.500}, {red.400})',
            shadow: 'none',
          },
        },
        contrast: {
          background: 'light-dark({surface.950}, {surface.0})',
          hoverBackground: 'light-dark({surface.900}, {surface.100})',
          activeBackground: 'light-dark({surface.800}, {surface.200})',
          borderColor: 'light-dark({surface.950}, {surface.0})',
          hoverBorderColor: 'light-dark({surface.900}, {surface.100})',
          activeBorderColor: 'light-dark({surface.800}, {surface.200})',
          color: 'light-dark({surface.0}, {surface.950})',
          hoverColor: 'light-dark({surface.0}, {surface.950})',
          activeColor: 'light-dark({surface.0}, {surface.950})',
          focusRing: {
            color: 'light-dark({surface.950}, {surface.0})',
            shadow: 'none',
          },
        },
      },
      outlined: {
        primary: {
          hoverBackground:
            'light-dark({primary.50}, color-mix(in srgb, {primary.color}, transparent 96%))',
          activeBackground:
            'light-dark({primary.100}, color-mix(in srgb, {primary.color}, transparent 84%))',
          borderColor: 'light-dark({primary.200}, {primary.700})',
          color: '{primary.color}',
        },
        secondary: {
          hoverBackground: 'light-dark({surface.50}, rgba(255,255,255,0.04))',
          activeBackground: 'light-dark({surface.100}, rgba(255,255,255,0.16))',
          borderColor: 'light-dark({surface.200}, {surface.700})',
          color: 'light-dark({surface.500}, {surface.400})',
        },
        success: {
          hoverBackground:
            'light-dark({green.50}, color-mix(in srgb, {green.400}, transparent 96%))',
          activeBackground:
            'light-dark({green.100}, color-mix(in srgb, {green.400}, transparent 84%))',
          borderColor: 'light-dark({green.200}, {green.700})',
          color: 'light-dark({green.500}, {green.400})',
        },
        info: {
          hoverBackground: 'light-dark({sky.50}, color-mix(in srgb, {sky.400}, transparent 96%))',
          activeBackground: 'light-dark({sky.100}, color-mix(in srgb, {sky.400}, transparent 84%))',
          borderColor: 'light-dark({sky.200}, {sky.700})',
          color: 'light-dark({sky.500}, {sky.400})',
        },
        warn: {
          hoverBackground:
            'light-dark({orange.50}, color-mix(in srgb, {orange.400}, transparent 96%))',
          activeBackground:
            'light-dark({orange.100}, color-mix(in srgb, {orange.400}, transparent 84%))',
          borderColor: 'light-dark({orange.200}, {orange.700})',
          color: 'light-dark({orange.500}, {orange.400})',
        },
        help: {
          hoverBackground:
            'light-dark({purple.50}, color-mix(in srgb, {purple.400}, transparent 96%))',
          activeBackground:
            'light-dark({purple.100}, color-mix(in srgb, {purple.400}, transparent 84%))',
          borderColor: 'light-dark({purple.200}, {purple.700})',
          color: 'light-dark({purple.500}, {purple.400})',
        },
        danger: {
          hoverBackground: 'light-dark({red.50}, color-mix(in srgb, {red.400}, transparent 96%))',
          activeBackground: 'light-dark({red.100}, color-mix(in srgb, {red.400}, transparent 84%))',
          borderColor: 'light-dark({red.200}, {red.700})',
          color: 'light-dark({red.500}, {red.400})',
        },
        contrast: {
          hoverBackground: 'light-dark({surface.50}, {surface.800})',
          activeBackground: 'light-dark({surface.100}, {surface.700})',
          borderColor: 'light-dark({surface.700}, {surface.500})',
          color: 'light-dark({surface.950}, {surface.0})',
        },
        plain: {
          hoverBackground: 'light-dark({surface.50}, {surface.800})',
          activeBackground: 'light-dark({surface.100}, {surface.700})',
          borderColor: 'light-dark({surface.200}, {surface.600})',
          color: 'light-dark({surface.700}, {surface.0})',
        },
      },
      text: {
        primary: {
          hoverBackground:
            'light-dark({primary.50}, color-mix(in srgb, {primary.color}, transparent 96%))',
          activeBackground:
            'light-dark({primary.100}, color-mix(in srgb, {primary.color}, transparent 84%))',
          color: '{primary.color}',
        },
        secondary: {
          hoverBackground: 'light-dark({surface.50}, {surface.800})',
          activeBackground: 'light-dark({surface.100}, {surface.700})',
          color: 'light-dark({surface.500}, {surface.400})',
        },
        success: {
          hoverBackground:
            'light-dark({green.50}, color-mix(in srgb, {green.400}, transparent 96%))',
          activeBackground:
            'light-dark({green.100}, color-mix(in srgb, {green.400}, transparent 84%))',
          color: 'light-dark({green.500}, {green.400})',
        },
        info: {
          hoverBackground: 'light-dark({sky.50}, color-mix(in srgb, {sky.400}, transparent 96%))',
          activeBackground: 'light-dark({sky.100}, color-mix(in srgb, {sky.400}, transparent 84%))',
          color: 'light-dark({sky.500}, {sky.400})',
        },
        warn: {
          hoverBackground:
            'light-dark({orange.50}, color-mix(in srgb, {orange.400}, transparent 96%))',
          activeBackground:
            'light-dark({orange.100}, color-mix(in srgb, {orange.400}, transparent 84%))',
          color: 'light-dark({orange.500}, {orange.400})',
        },
        help: {
          hoverBackground:
            'light-dark({purple.50}, color-mix(in srgb, {purple.400}, transparent 96%))',
          activeBackground:
            'light-dark({purple.100}, color-mix(in srgb, {purple.400}, transparent 84%))',
          color: 'light-dark({purple.500}, {purple.400})',
        },
        danger: {
          hoverBackground: 'light-dark({red.50}, color-mix(in srgb, {red.400}, transparent 96%))',
          activeBackground: 'light-dark({red.100}, color-mix(in srgb, {red.400}, transparent 84%))',
          color: 'light-dark({red.500}, {red.400})',
        },
        contrast: {
          hoverBackground: 'light-dark({surface.50}, {surface.800})',
          activeBackground: 'light-dark({surface.100}, {surface.700})',
          color: 'light-dark({surface.950}, {surface.0})',
        },
        plain: {
          hoverBackground: 'light-dark({surface.50}, {surface.800})',
          activeBackground: 'light-dark({surface.100}, {surface.700})',
          color: 'light-dark({surface.700}, {surface.0})',
        },
      },
      link: {
        color: '{primary.color}',
        hoverColor: '{primary.color}',
        activeColor: '{primary.color}',
      },
    },
    card: {
      root: {
        background: '{content.background}',
        borderRadius: '{border.radius.xl}',
        color: '{content.color}',
        shadow: 'none',
      },
      body: {
        padding: '1.5rem',
        gap: '1rem',
      },
      caption: {
        gap: '0.5rem',
      },
      title: {
        fontSize: '1.25rem',
        fontWeight: '600',
      },
      subtitle: {
        color: '{text.muted.color}',
        fontSize: '0.875rem',
        fontWeight: '{typography.font.weight}',
      },
    },
    carousel: {
      root: {
        transitionDuration: '{transition.duration}',
      },
      content: {
        gap: '0.25rem',
      },
      indicatorList: {
        padding: '1rem',
        gap: '0.5rem',
      },
      indicator: {
        width: '1.75rem',
        height: '0.5rem',
        borderRadius: '{content.border.radius}',
        background: 'light-dark({surface.200}, {surface.700})',
        hoverBackground: 'light-dark({surface.300}, {surface.600})',
        activeBackground: '{primary.color}',
        focusRing: {
          width: '{focus.ring.width}',
          style: '{focus.ring.style}',
          color: '{focus.ring.color}',
          offset: '{focus.ring.offset}',
          shadow: '{focus.ring.shadow}',
        },
      },
    },
    cascadeselect: {
      root: {
        background: '{form.field.background}',
        disabledBackground: '{form.field.disabled.background}',
        filledBackground: '{form.field.filled.background}',
        filledHoverBackground: '{form.field.filled.hover.background}',
        filledFocusBackground: '{form.field.filled.focus.background}',
        borderColor: '{form.field.border.color}',
        hoverBorderColor: '{form.field.hover.border.color}',
        focusBorderColor: '{form.field.focus.border.color}',
        invalidBorderColor: '{form.field.invalid.border.color}',
        color: '{form.field.color}',
        disabledColor: '{form.field.disabled.color}',
        placeholderColor: '{form.field.placeholder.color}',
        invalidPlaceholderColor: '{form.field.invalid.placeholder.color}',
        shadow: '{form.field.shadow}',
        paddingX: '{form.field.padding.x}',
        paddingY: '{form.field.padding.y}',
        borderRadius: '{form.field.border.radius}',
        focusRing: {
          width: '{form.field.focus.ring.width}',
          style: '{form.field.focus.ring.style}',
          color: '{form.field.focus.ring.color}',
          offset: '{form.field.focus.ring.offset}',
          shadow: '{form.field.focus.ring.shadow}',
        },
        transitionDuration: '{form.field.transition.duration}',
        sm: {
          fontSize: '{form.field.sm.font.size}',
          paddingX: '{form.field.sm.padding.x}',
          paddingY: '{form.field.sm.padding.y}',
        },
        lg: {
          fontSize: '{form.field.lg.font.size}',
          paddingX: '{form.field.lg.padding.x}',
          paddingY: '{form.field.lg.padding.y}',
        },
        fontWeight: '{form.field.font.weight}',
        fontSize: '{form.field.font.size}',
      },
      dropdown: {
        width: '2.25rem',
        color: '{form.field.icon.color}',
      },
      overlay: {
        background: '{overlay.select.background}',
        borderColor: '{overlay.select.border.color}',
        borderRadius: '{overlay.select.border.radius}',
        color: '{overlay.select.color}',
        shadow: '{overlay.select.shadow}',
      },
      list: {
        padding: '{list.padding}',
        gap: '{list.gap}',
        mobileIndent: '1rem',
      },
      option: {
        focusBackground: '{list.option.focus.background}',
        selectedBackground: '{list.option.selected.background}',
        selectedFocusBackground: '{list.option.selected.focus.background}',
        color: '{list.option.color}',
        focusColor: '{list.option.focus.color}',
        selectedColor: '{list.option.selected.color}',
        selectedFocusColor: '{list.option.selected.focus.color}',
        selectedFontWeight: '{list.option.selected.font.weight}',
        padding: '{list.option.padding}',
        borderRadius: '{list.option.border.radius}',
        icon: {
          color: '{list.option.icon.color}',
          focusColor: '{list.option.icon.focus.color}',
          size: '0.75rem',
        },
        fontWeight: '{list.option.font.weight}',
        fontSize: '{list.option.font.size}',
      },
      clearIcon: {
        color: '{form.field.icon.color}',
      },
    },
    checkbox: {
      root: {
        borderRadius: '{border.radius.sm}',
        width: '1.125rem',
        height: '1.125rem',
        background: '{form.field.background}',
        checkedBackground: '{primary.color}',
        checkedHoverBackground: '{primary.hover.color}',
        disabledBackground: '{form.field.disabled.background}',
        filledBackground: '{form.field.filled.background}',
        borderColor: '{form.field.border.color}',
        hoverBorderColor: '{form.field.hover.border.color}',
        focusBorderColor: '{form.field.border.color}',
        checkedBorderColor: '{primary.color}',
        checkedHoverBorderColor: '{primary.hover.color}',
        checkedFocusBorderColor: '{primary.color}',
        checkedDisabledBorderColor: '{form.field.border.color}',
        invalidBorderColor: '{form.field.invalid.border.color}',
        shadow: '{form.field.shadow}',
        focusRing: {
          width: '{focus.ring.width}',
          style: '{focus.ring.style}',
          color: '{focus.ring.color}',
          offset: '{focus.ring.offset}',
          shadow: '{focus.ring.shadow}',
        },
        transitionDuration: '{form.field.transition.duration}',
        sm: {
          width: '0.875rem',
          height: '0.875rem',
        },
        lg: {
          width: '1.25rem',
          height: '1.25rem',
        },
      },
      icon: {
        size: '0.75rem',
        color: '{form.field.color}',
        checkedColor: '{primary.contrast.color}',
        checkedHoverColor: '{primary.contrast.color}',
        disabledColor: '{form.field.disabled.color}',
        sm: {
          size: '0.625rem',
        },
        lg: {
          size: '0.875rem',
        },
      },
    },
    chip: {
      root: {
        borderRadius: '1rem',
        paddingX: '0.625rem',
        paddingY: '0.375rem',
        gap: '0.375rem',
        transitionDuration: '{transition.duration}',
        background: 'light-dark({surface.100}, {surface.800})',
        focusBackground: 'light-dark({surface.200}, {surface.700})',
        color: 'light-dark({surface.800}, {surface.0})',
      },
      image: {
        width: '1.75rem',
        height: '1.75rem',
      },
      icon: {
        size: '0.875rem',
        color: 'light-dark({surface.800}, {surface.0})',
      },
      label: {
        fontWeight: '{typography.font.weight}',
        fontSize: '0.75rem',
      },
      removeIcon: {
        size: '0.875rem',
        color: 'light-dark({surface.800}, {surface.0})',
        focusRing: {
          width: '{focus.ring.width}',
          style: '{focus.ring.style}',
          color: '{focus.ring.color}',
          offset: '{focus.ring.offset}',
          shadow: '{form.field.focus.ring.shadow}',
        },
      },
    },
    colorpicker: {
      root: {
        transitionDuration: '{transition.duration}',
      },
      preview: {
        width: '1.375rem',
        height: '1.375rem',
        borderRadius: '{form.field.border.radius}',
        focusRing: {
          width: '{focus.ring.width}',
          style: '{focus.ring.style}',
          color: '{focus.ring.color}',
          offset: '{focus.ring.offset}',
          shadow: '{focus.ring.shadow}',
        },
      },
      panel: {
        shadow: '{overlay.popover.shadow}',
        borderRadius: '{overlay.popover.borderRadius}',
        background: 'light-dark({surface.800}, {surface.900})',
        borderColor: 'light-dark({surface.900}, {surface.700})',
      },
      handle: {
        color: '{surface.0}',
      },
    },
    commandmenu: {
      root: {
        background: '{content.background}',
        borderColor: '{content.border.color}',
        borderRadius: '{content.border.radius}',
        height: '25rem',
      },
      header: {
        padding: '0.375rem 1.125rem',
        background: '{content.background}',
        borderColor: '{content.border.color}',
      },
      input: {
        padding: '0.375rem 0',
        fontSize: '1rem',
        fontWeight: '{typography.font.weight}',
        color: '{form.field.color}',
        placeholderColor: '{form.field.placeholder.color}',
      },
      list: {
        padding: '0.375rem',
      },
      empty: {
        padding: '2rem 0',
        color: '{content.color}',
      },
      footer: {
        padding: '0.625rem 1.125rem',
        background: '{content.background}',
        borderColor: '{content.border.color}',
      },
    },
    compare: {
      root: {
        borderRadius: '{content.border.radius}',
      },
      handle: {
        background: '{content.background}',
        size: '1px',
      },
      indicator: {
        size: '1.5rem',
        background: '{content.background}',
        borderRadius: '{content.border.radius}',
        focusRing: {
          width: '2px',
          style: 'solid',
          color: '{content.background}',
          offset: '2px',
        },
        icon: {
          color: '{text.muted.color}',
          size: '{icon.size}',
        },
      },
    },
    confirmdialog: {
      icon: {
        size: '1.5rem',
        color: '{overlay.modal.color}',
      },
      content: {
        gap: '0.875rem',
      },
      message: {
        color: '{content.color}',
        fontWeight: '{typography.font.weight}',
        fontSize: '{typography.font.size}',
      },
    },
    confirmpopup: {
      root: {
        background: '{overlay.popover.background}',
        borderColor: '{overlay.popover.border.color}',
        color: '{overlay.popover.color}',
        borderRadius: '{overlay.popover.border.radius}',
        shadow: '{overlay.popover.shadow}',
        gutter: '10px',
        arrowOffset: '1.125rem',
      },
      content: {
        padding: '{overlay.popover.padding}',
        gap: '0.5rem',
      },
      icon: {
        size: '1.25rem',
        color: '{overlay.popover.color}',
      },
      message: {
        color: '{content.color}',
        fontWeight: '{typography.font.weight}',
        fontSize: '{typography.font.size}',
      },
      footer: {
        gap: '0.375rem',
        padding: '0 {overlay.popover.padding} {overlay.popover.padding} {overlay.popover.padding}',
      },
    },
    contextmenu: {
      root: {
        background: '{content.background}',
        borderColor: '{content.border.color}',
        color: '{content.color}',
        borderRadius: '{content.border.radius}',
        shadow: '{overlay.navigation.shadow}',
        transitionDuration: '{navigation.item.transition.duration}',
      },
      list: {
        padding: '{navigation.list.padding}',
        gap: '{navigation.list.gap}',
      },
      item: {
        focusBackground: '{navigation.item.focus.background}',
        activeBackground: '{navigation.item.active.background}',
        color: '{navigation.item.color}',
        focusColor: '{navigation.item.focus.color}',
        activeColor: '{navigation.item.active.color}',
        padding: '{navigation.item.padding}',
        borderRadius: '{navigation.item.border.radius}',
        gap: '{navigation.item.gap}',
        icon: {
          color: '{navigation.item.icon.color}',
          focusColor: '{navigation.item.icon.focus.color}',
          activeColor: '{navigation.item.icon.active.color}',
          size: '{navigation.item.icon.size}',
        },
        label: {
          fontWeight: '{navigation.item.label.font.weight}',
          fontSize: '{navigation.item.label.font.size}',
        },
      },
      submenu: {
        mobileIndent: '1rem',
      },
      submenuLabel: {
        padding: '{navigation.submenu.label.padding}',
        fontWeight: '{navigation.submenu.label.font.weight}',
        fontSize: '{navigation.submenu.label.font.size}',
        background: '{navigation.submenu.label.background}',
        color: '{navigation.submenu.label.color}',
      },
      submenuIcon: {
        size: '{navigation.submenu.icon.size}',
        color: '{navigation.submenu.icon.color}',
        focusColor: '{navigation.submenu.icon.focus.color}',
        activeColor: '{navigation.submenu.icon.active.color}',
      },
      separator: {
        borderColor: '{content.border.color}',
      },
    },
    datatable: {
      root: {
        transitionDuration: '0s',
        borderColor: 'light-dark({content.border.color}, {surface.800})',
      },
      header: {
        background: '{content.background}',
        borderColor: '{datatable.border.color}',
        color: '{content.color}',
        borderWidth: '0 0 1px 0',
        padding: '0.5rem 0.875rem',
        sm: {
          padding: '0.125rem 0.375rem',
        },
        lg: {
          padding: '0.75rem 1.125rem',
        },
      },
      headerCell: {
        background: '{content.background}',
        hoverBackground: '{content.hover.background}',
        selectedBackground: '{content.background}',
        borderColor: '{datatable.border.color}',
        color: '{surface.700}',
        hoverColor: '{content.hover.color}',
        selectedColor: '{content.color}',
        gap: '0.5rem',
        padding: '0.625rem 1rem',
        focusRing: {
          width: '{focus.ring.width}',
          style: '{focus.ring.style}',
          color: '{focus.ring.color}',
          offset: '-1px',
          shadow: '{focus.ring.shadow}',
        },
        sm: {
          padding: '0.125rem 0.375rem',
        },
        lg: {
          padding: '0.75rem 1.125rem',
        },
      },
      // En-têtes discrets (13px, gris foncé), comme les tableaux de hPanel.
      columnTitle: {
        fontWeight: '600',
        fontSize: '0.8125rem',
      },
      row: {
        background: '{content.background}',
        hoverBackground: '{content.hover.background}',
        selectedBackground: '{highlight.background}',
        color: '{content.color}',
        hoverColor: '{content.hover.color}',
        selectedColor: '{highlight.color}',
        stripedBackground: 'light-dark({surface.50}, {surface.950})',
        focusRing: {
          width: '{focus.ring.width}',
          style: '{focus.ring.style}',
          color: '{focus.ring.color}',
          offset: '-1px',
          shadow: '{focus.ring.shadow}',
        },
      },
      bodyCell: {
        borderColor: '{datatable.border.color}',
        padding: '0.75rem 1rem',
        fontWeight: '{typography.font.size}',
        fontSize: '{typography.font.size}',
        selectedBorderColor: 'light-dark({primary.100}, {primary.900})',
        sm: {
          padding: '0.125rem 0.375rem',
        },
        lg: {
          padding: '0.75rem 1.125rem',
        },
      },
      footerCell: {
        background: '{content.background}',
        borderColor: '{datatable.border.color}',
        color: '{content.color}',
        padding: '0.5rem 0.875rem',
        sm: {
          padding: '0.125rem 0.375rem',
        },
        lg: {
          padding: '0.75rem 1.125rem',
        },
      },
      columnFooter: {
        fontWeight: '600',
        fontSize: '{typography.font.size}',
      },
      footer: {
        background: '{content.background}',
        borderColor: '{datatable.border.color}',
        color: '{content.color}',
        borderWidth: '0 0 1px 0',
        padding: '0.5rem 0.875rem',
        sm: {
          padding: '0.125rem 0.375rem',
        },
        lg: {
          padding: '0.75rem 1.125rem',
        },
      },
      dropPoint: {
        color: '{primary.color}',
      },
      columnResizer: {
        width: '0.5rem',
      },
      resizeIndicator: {
        width: '1px',
        color: '{primary.color}',
      },
      sortIcon: {
        color: '{text.muted.color}',
        hoverColor: '{text.hover.muted.color}',
        size: '0.75rem',
      },
      loadingIcon: {
        size: '1.75rem',
      },
      rowToggleButton: {
        hoverBackground: '{content.hover.background}',
        selectedHoverBackground: '{content.background}',
        color: '{text.muted.color}',
        hoverColor: '{text.color}',
        selectedHoverColor: '{primary.color}',
        size: '1.5rem',
        borderRadius: '50%',
        focusRing: {
          width: '{focus.ring.width}',
          style: '{focus.ring.style}',
          color: '{focus.ring.color}',
          offset: '{focus.ring.offset}',
          shadow: '{focus.ring.shadow}',
        },
      },
      filter: {
        inlineGap: '0.5rem',
        overlaySelect: {
          background: '{overlay.select.background}',
          borderColor: '{overlay.select.border.color}',
          borderRadius: '{overlay.select.border.radius}',
          color: '{overlay.select.color}',
          shadow: '{overlay.select.shadow}',
        },
        overlayPopover: {
          background: '{overlay.popover.background}',
          borderColor: '{overlay.popover.border.color}',
          borderRadius: '{overlay.popover.border.radius}',
          color: '{overlay.popover.color}',
          shadow: '{overlay.popover.shadow}',
          padding: '{overlay.popover.padding}',
          gap: '0.5rem',
        },
        rule: {
          borderColor: '{content.border.color}',
        },
        constraintList: {
          padding: '{list.padding}',
          gap: '{list.gap}',
        },
        constraint: {
          focusBackground: '{list.option.focus.background}',
          selectedBackground: '{list.option.selected.background}',
          selectedFocusBackground: '{list.option.selected.focus.background}',
          color: '{list.option.color}',
          focusColor: '{list.option.focus.color}',
          selectedColor: '{list.option.selected.color}',
          selectedFocusColor: '{list.option.selected.focus.color}',
          separator: {
            borderColor: '{content.border.color}',
          },
          padding: '{list.option.padding}',
          borderRadius: '{list.option.border.radius}',
        },
      },
      paginatorTop: {
        borderColor: '{datatable.border.color}',
        borderWidth: '0 0 1px 0',
      },
      paginatorBottom: {
        borderColor: '{datatable.border.color}',
        borderWidth: '0 0 1px 0',
      },
      css: '\n    .p-datatable-mask.p-overlay-mask {\n        --px-mask-background: light-dark(rgba(255,255,255,0.5),rgba(0,0,0,0.3));\n    }\n',
    },
    dataview: {
      root: {
        borderColor: 'transparent',
        borderWidth: '0',
        borderRadius: '0',
        padding: '0',
      },
      header: {
        background: '{content.background}',
        color: '{content.color}',
        borderColor: '{content.border.color}',
        borderWidth: '0 0 1px 0',
        padding: '0.625rem 0.875rem',
        borderRadius: '0',
      },
      content: {
        background: '{content.background}',
        color: '{content.color}',
        borderColor: 'transparent',
        borderWidth: '0',
        padding: '0',
        borderRadius: '0',
      },
      footer: {
        background: '{content.background}',
        color: '{content.color}',
        borderColor: '{content.border.color}',
        borderWidth: '1px 0 0 0',
        padding: '0.625rem 0.875rem',
        borderRadius: '0',
      },
      paginatorTop: {
        borderColor: '{content.border.color}',
        borderWidth: '0 0 1px 0',
      },
      paginatorBottom: {
        borderColor: '{content.border.color}',
        borderWidth: '1px 0 0 0',
      },
    },
    datepicker: {
      root: {
        transitionDuration: '{transition.duration}',
      },
      panel: {
        background: '{content.background}',
        borderColor: '{content.border.color}',
        color: '{content.color}',
        borderRadius: '{content.border.radius}',
        shadow: '{overlay.popover.shadow}',
        padding: '{overlay.popover.padding}',
      },
      header: {
        background: '{content.background}',
        borderColor: '{content.border.color}',
        color: '{content.color}',
        padding: '0 0 0.5rem 0',
      },
      title: {
        gap: '0.5rem',
        fontWeight: '500',
        fontSize: '{typography.font.size}',
      },
      dropdown: {
        width: '2.25rem',
        sm: {
          width: '1.75rem',
        },
        lg: {
          width: '2.625rem',
        },
        background: 'light-dark({surface.100}, {surface.800})',
        hoverBackground: 'light-dark({surface.200}, {surface.700})',
        activeBackground: 'light-dark({surface.300}, {surface.600})',
        borderColor: '{form.field.border.color}',
        hoverBorderColor: '{form.field.border.color}',
        activeBorderColor: '{form.field.border.color}',
        color: 'light-dark({surface.600}, {surface.300})',
        hoverColor: 'light-dark({surface.700}, {surface.200})',
        activeColor: 'light-dark({surface.800}, {surface.100})',
        borderRadius: '{form.field.border.radius}',
        focusRing: {
          width: '{focus.ring.width}',
          style: '{focus.ring.style}',
          color: '{focus.ring.color}',
          offset: '{focus.ring.offset}',
          shadow: '{focus.ring.shadow}',
        },
      },
      inputIcon: {
        color: '{form.field.icon.color}',
      },
      selectMonth: {
        hoverBackground: '{content.hover.background}',
        color: '{content.color}',
        hoverColor: '{content.hover.color}',
        padding: '0.25rem 0.5rem',
        borderRadius: '{content.border.radius}',
        fontWeight: '500',
        fontSize: '{typography.font.size}',
      },
      selectYear: {
        hoverBackground: '{content.hover.background}',
        color: '{content.color}',
        hoverColor: '{content.hover.color}',
        padding: '0.25rem 0.5rem',
        borderRadius: '{content.border.radius}',
        fontWeight: '500',
        fontSize: '{typography.font.size}',
      },
      group: {
        borderColor: '{content.border.color}',
        gap: '{overlay.popover.padding}',
      },
      dayView: {
        margin: '0.5rem 0 0 0',
      },
      weekDay: {
        padding: '0.25rem',
        fontWeight: '500',
        fontSize: '{typography.font.size}',
        color: '{content.color}',
      },
      date: {
        fontWeight: '{typography.font.weight}',
        fontSize: '{typography.font.size}',
        hoverBackground: '{content.hover.background}',
        selectedBackground: '{primary.color}',
        rangeSelectedBackground: '{highlight.background}',
        color: '{content.color}',
        hoverColor: '{content.hover.color}',
        selectedColor: '{primary.contrast.color}',
        rangeSelectedColor: '{highlight.color}',
        width: '1.75rem',
        height: '1.75rem',
        borderRadius: '50%',
        padding: '0.25rem',
        focusRing: {
          width: '{focus.ring.width}',
          style: '{focus.ring.style}',
          color: '{focus.ring.color}',
          offset: '{focus.ring.offset}',
          shadow: '{focus.ring.shadow}',
        },
      },
      monthView: {
        margin: '0.5rem 0 0 0',
      },
      month: {
        padding: '0.25rem',
        borderRadius: '{content.border.radius}',
      },
      yearView: {
        margin: '0.5rem 0 0 0',
      },
      year: {
        padding: '0.25rem',
        borderRadius: '{content.border.radius}',
      },
      buttonbar: {
        padding: '0.5rem 0 0 0',
        borderColor: '{content.border.color}',
      },
      timePicker: {
        padding: '0.5rem 0 0 0',
        borderColor: '{content.border.color}',
        gap: '0.5rem',
        buttonGap: '0.125rem',
        color: '{content.color}',
        fontWeight: '{typography.font.weight}',
        fontSize: '{typography.font.size}',
      },
      today: {
        background: 'light-dark({surface.200}, {surface.700})',
        color: 'light-dark({surface.900}, {surface.0})',
      },
    },
    dialog: {
      root: {
        background: '{overlay.modal.background}',
        borderColor: '{overlay.modal.border.color}',
        color: '{overlay.modal.color}',
        borderRadius: '{overlay.modal.border.radius}',
        shadow: '{overlay.modal.shadow}',
      },
      header: {
        padding: '{overlay.modal.padding}',
        gap: '0.5rem',
      },
      title: {
        fontSize: '1.125rem',
        fontWeight: '600',
      },
      content: {
        padding: '0 {overlay.modal.padding} {overlay.modal.padding} {overlay.modal.padding}',
      },
      footer: {
        padding: '0 {overlay.modal.padding} {overlay.modal.padding} {overlay.modal.padding}',
        gap: '0.375rem',
      },
    },
    divider: {
      root: {
        borderColor: '{content.border.color}',
      },
      content: {
        background: '{content.background}',
        color: '{text.color}',
      },
      horizontal: {
        margin: '0.875rem 0',
        padding: '0 0.875rem',
        content: {
          padding: '0 0.375rem',
        },
      },
      vertical: {
        margin: '0 0.875rem',
        padding: '0.375rem 0',
        content: {
          padding: '0.375rem 0',
        },
      },
    },
    dock: {
      root: {
        background: 'rgba(255, 255, 255, 0.1)',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        padding: '0.5rem',
        borderRadius: '{border.radius.xl}',
      },
      item: {
        borderRadius: '{content.border.radius}',
        padding: '0.5rem',
        size: '2.625rem',
        focusRing: {
          width: '{focus.ring.width}',
          style: '{focus.ring.style}',
          color: '{focus.ring.color}',
          offset: '{focus.ring.offset}',
          shadow: '{focus.ring.shadow}',
        },
      },
    },
    drawer: {
      root: {
        background: '{overlay.modal.background}',
        borderColor: '{overlay.modal.border.color}',
        color: '{overlay.modal.color}',
        shadow: '{overlay.modal.shadow}',
      },
      header: {
        padding: '{overlay.modal.padding}',
      },
      title: {
        fontSize: '1.125rem',
        fontWeight: '600',
      },
      content: {
        padding: '0 {overlay.modal.padding} {overlay.modal.padding} {overlay.modal.padding}',
      },
      footer: {
        padding: '{overlay.modal.padding}',
      },
    },
    editor: {
      toolbar: {
        background: '{content.background}',
        borderColor: '{content.border.color}',
        borderRadius: '{content.border.radius}',
      },
      toolbarItem: {
        color: '{text.muted.color}',
        hoverColor: '{text.color}',
        activeColor: '{primary.color}',
      },
      overlay: {
        background: '{overlay.select.background}',
        borderColor: '{overlay.select.border.color}',
        borderRadius: '{overlay.select.border.radius}',
        color: '{overlay.select.color}',
        shadow: '{overlay.select.shadow}',
        padding: '{list.padding}',
      },
      overlayOption: {
        focusBackground: '{list.option.focus.background}',
        color: '{list.option.color}',
        focusColor: '{list.option.focus.color}',
        padding: '{list.option.padding}',
        borderRadius: '{list.option.border.radius}',
      },
      content: {
        background: '{content.background}',
        borderColor: '{content.border.color}',
        color: '{content.color}',
        borderRadius: '{content.border.radius}',
      },
    },
    fieldset: {
      root: {
        background: '{content.background}',
        borderColor: '{content.border.color}',
        borderRadius: '{content.border.radius}',
        color: '{content.color}',
        padding: '0 1rem 1rem 1rem',
        transitionDuration: '{transition.duration}',
      },
      legend: {
        background: '{content.background}',
        hoverBackground: '{content.hover.background}',
        color: '{content.color}',
        hoverColor: '{content.hover.color}',
        borderRadius: '{content.border.radius}',
        borderWidth: '1px',
        borderColor: 'transparent',
        padding: '.375rem 0.625rem',
        gap: '0.5rem',
        fontWeight: '600',
        fontSize: '{typography.font.size}',
        focusRing: {
          width: '{focus.ring.width}',
          style: '{focus.ring.style}',
          color: '{focus.ring.color}',
          offset: '{focus.ring.offset}',
          shadow: '{focus.ring.shadow}',
        },
      },
      toggleIcon: {
        color: '{text.muted.color}',
        hoverColor: '{text.hover.muted.color}',
      },
      content: {
        padding: '0',
      },
    },
    fileupload: {
      root: {
        background: '{content.background}',
        borderColor: '{content.border.color}',
        color: '{content.color}',
        borderRadius: '{content.border.radius}',
        transitionDuration: '{transition.duration}',
      },
      header: {
        background: 'transparent',
        color: '{text.color}',
        padding: '1rem',
        borderColor: 'unset',
        borderWidth: '0',
        borderRadius: '0',
        gap: '0.5rem',
      },
      content: {
        highlightBorderColor: '{primary.color}',
        padding: '0 1rem 1rem 1rem',
        gap: '0.875rem',
      },
      file: {
        padding: '0.875rem',
        gap: '0.875rem',
        borderColor: '{content.border.color}',
        info: {
          gap: '0.125rem',
        },
      },
      fileName: {
        color: '{text.color}',
        fontWeight: '{typography.font.weight}',
        fontSize: '{typography.font.size}',
      },
      fileSize: {
        color: '{text.muted.color}',
        fontWeight: '{typography.font.weight}',
        fontSize: '0.75rem',
      },
      fileList: {
        gap: '0.5rem',
      },
      progressbar: {
        height: '0.25rem',
      },
      basic: {
        gap: '0.5rem',
      },
    },
    floatlabel: {
      root: {
        color: '{form.field.float.label.color}',
        focusColor: '{form.field.float.label.focus.color}',
        activeColor: '{form.field.float.label.active.color}',
        invalidColor: '{form.field.float.label.invalid.color}',
        transitionDuration: '0.2s',
        positionX: '{form.field.padding.x}',
        positionY: '{form.field.padding.y}',
        fontWeight: '{form.field.font.weight}',
        fontSize: '{form.field.font.size}',
        active: {
          fontSize: '0.625rem',
          fontWeight: '400',
        },
      },
      over: {
        active: {
          top: '-1.125rem',
        },
      },
      in: {
        input: {
          paddingTop: '1.125rem',
          paddingBottom: '{form.field.padding.y}',
        },
        active: {
          top: '{form.field.padding.y}',
        },
      },
      on: {
        borderRadius: '{border.radius.xs}',
        active: {
          background: '{form.field.background}',
          padding: '0 0.125rem',
        },
      },
    },
    galleria: {
      root: {
        borderWidth: '1px',
        borderColor: '{content.border.color}',
        borderRadius: '{content.border.radius}',
        transitionDuration: '{transition.duration}',
      },
      navButton: {
        background: 'rgba(255, 255, 255, 0.1)',
        hoverBackground: 'rgba(255, 255, 255, 0.2)',
        color: '{surface.100}',
        hoverColor: '{surface.0}',
        size: '2.625rem',
        gutter: '0.5rem',
        prev: {
          borderRadius: '50%',
        },
        next: {
          borderRadius: '50%',
        },
        focusRing: {
          width: '{focus.ring.width}',
          style: '{focus.ring.style}',
          color: '{focus.ring.color}',
          offset: '{focus.ring.offset}',
          shadow: '{focus.ring.shadow}',
        },
      },
      navIcon: {
        size: '1.25rem',
      },
      thumbnailsContent: {
        background: '{content.background}',
        padding: '0.875rem 0.25rem',
      },
      thumbnailNavButton: {
        size: '1.75rem',
        borderRadius: '{content.border.radius}',
        gutter: '0.5rem',
        hoverBackground: 'light-dark({surface.100}, {surface.700})',
        color: 'light-dark({surface.600}, {surface.400})',
        hoverColor: 'light-dark({surface.700}, {surface.0})',
        focusRing: {
          width: '{focus.ring.width}',
          style: '{focus.ring.style}',
          color: '{focus.ring.color}',
          offset: '{focus.ring.offset}',
          shadow: '{focus.ring.shadow}',
        },
      },
      thumbnailNavButtonIcon: {
        size: '0.875rem',
      },
      caption: {
        background: 'rgba(0, 0, 0, 0.5)',
        color: '{surface.100}',
        padding: '0.875rem',
      },
      indicatorList: {
        gap: '0.5rem',
        padding: '0.875rem',
      },
      indicatorButton: {
        width: '0.875rem',
        height: '0.875rem',
        background: 'light-dark({surface.200}, {surface.700})',
        hoverBackground: 'light-dark({surface.300}, {surface.600})',
        activeBackground: '{primary.color}',
        borderRadius: '50%',
        focusRing: {
          width: '{focus.ring.width}',
          style: '{focus.ring.style}',
          color: '{focus.ring.color}',
          offset: '{focus.ring.offset}',
          shadow: '{focus.ring.shadow}',
        },
      },
      insetIndicatorList: {
        background: 'rgba(0, 0, 0, 0.5)',
      },
      insetIndicatorButton: {
        background: 'rgba(255, 255, 255, 0.4)',
        hoverBackground: 'rgba(255, 255, 255, 0.6)',
        activeBackground: 'rgba(255, 255, 255, 0.9)',
      },
      closeButton: {
        size: '2.625rem',
        gutter: '0.5rem',
        background: 'rgba(255, 255, 255, 0.1)',
        hoverBackground: 'rgba(255, 255, 255, 0.2)',
        color: '{surface.50}',
        hoverColor: '{surface.0}',
        borderRadius: '50%',
        focusRing: {
          width: '{focus.ring.width}',
          style: '{focus.ring.style}',
          color: '{focus.ring.color}',
          offset: '{focus.ring.offset}',
          shadow: '{focus.ring.shadow}',
        },
      },
      closeButtonIcon: {
        size: '1.25rem',
      },
    },
    gallery: {
      backdrop: {
        background: '{surface.950}',
      },
      header: {
        padding: '0.75rem 1rem',
        background: '{surface.950}',
      },
      footer: {
        padding: '0.25rem 0',
        background: '{surface.950}',
        borderColor: '{surface.800}',
      },
      item: {
        transitionDuration: '0.3s',
      },
      action: {
        size: '2.25rem',
        borderRadius: '50%',
        color: '{surface.400}',
        hoverBackground: '{surface.800}',
        hoverColor: '{surface.0}',
        disabledOpacity: '{disabled.opacity}',
        transitionDuration: '{transition.duration}',
        icon: {
          size: '1rem',
        },
      },
      navigation: {
        background: 'color-mix(in srgb, {surface.800}, transparent 40%)',
        size: '2.25rem',
        borderRadius: '50%',
        color: '{surface.400}',
        hoverBackground: '{surface.800}',
        hoverColor: '{surface.0}',
        offset: '0.5rem',
        transitionDuration: '{transition.duration}',
        icon: {
          size: '1rem',
        },
      },
      thumbnail: {
        size: '5rem',
        padding: '0.25rem',
        background: '{surface.800}',
        borderRadius: '0.25rem',
        borderWidth: '3px',
        hoverBorderColor: '{surface.700}',
        activeBorderColor: '{primary.color}',
        activeScale: '0.85',
        transitionDuration: '{transition.duration}',
      },
      thumbnailContent: {
        padding: '0.25rem 0',
      },
    },
    iconfield: {
      icon: {
        color: '{form.field.icon.color}',
      },
    },
    iftalabel: {
      root: {
        color: '{form.field.float.label.color}',
        focusColor: '{form.field.float.label.focus.color}',
        invalidColor: '{form.field.float.label.invalid.color}',
        transitionDuration: '0.2s',
        positionX: '{form.field.padding.x}',
        top: '{form.field.padding.y}',
        fontWeight: '{form.field.font.weight}',
        fontSize: '0.625rem',
      },
      input: {
        paddingTop: '1.125rem',
        paddingBottom: '{form.field.padding.y}',
      },
    },
    image: {
      root: {
        transitionDuration: '{transition.duration}',
      },
      preview: {
        icon: {
          size: '1.25rem',
        },
        mask: {
          background: '{mask.background}',
          color: '{mask.color}',
        },
      },
      toolbar: {
        position: {
          left: 'auto',
          right: '1rem',
          top: '1rem',
          bottom: 'auto',
        },
        blur: '8px',
        background: 'rgba(255,255,255,0.1)',
        borderColor: 'rgba(255,255,255,0.2)',
        borderWidth: '1px',
        borderRadius: '30px',
        padding: '.5rem',
        gap: '0.5rem',
      },
      action: {
        hoverBackground: 'rgba(255,255,255,0.1)',
        color: '{surface.50}',
        hoverColor: '{surface.0}',
        size: '2.625rem',
        iconSize: '1.25rem',
        borderRadius: '50%',
        focusRing: {
          width: '{focus.ring.width}',
          style: '{focus.ring.style}',
          color: '{focus.ring.color}',
          offset: '{focus.ring.offset}',
          shadow: '{focus.ring.shadow}',
        },
      },
    },
    imagecompare: {
      handle: {
        size: '15px',
        hoverSize: '30px',
        background: 'rgba(255,255,255,0.3)',
        hoverBackground: 'rgba(255,255,255,0.3)',
        borderColor: 'unset',
        hoverBorderColor: 'unset',
        borderWidth: '0',
        borderRadius: '50%',
        transitionDuration: '{transition.duration}',
        focusRing: {
          width: '{focus.ring.width}',
          style: '{focus.ring.style}',
          color: 'rgba(255,255,255,0.3)',
          offset: '{focus.ring.offset}',
          shadow: '{focus.ring.shadow}',
        },
      },
    },
    inlinemessage: {
      root: {
        padding: '{form.field.padding.y} {form.field.padding.x}',
        borderRadius: '{content.border.radius}',
        gap: '0.5rem',
      },
      text: {
        fontWeight: '500',
      },
      icon: {
        size: '1rem',
      },
      info: {
        background:
          'light-dark(color-mix(in srgb, {blue.50}, transparent 5%), color-mix(in srgb, {blue.500}, transparent 84%))',
        borderColor: 'light-dark({blue.200}, color-mix(in srgb, {blue.700}, transparent 64%))',
        color: 'light-dark({blue.600}, {blue.500})',
        shadow: '0px 4px 8px 0px color-mix(in srgb, {blue.500}, transparent 96%)',
      },
      success: {
        background:
          'light-dark(color-mix(in srgb, {green.50}, transparent 5%), color-mix(in srgb, {green.500}, transparent 84%))',
        borderColor: 'light-dark({green.200}, color-mix(in srgb, {green.700}, transparent 64%))',
        color: 'light-dark({green.600}, {green.500})',
        shadow: '0px 4px 8px 0px color-mix(in srgb, {green.500}, transparent 96%)',
      },
      warn: {
        background:
          'light-dark(color-mix(in srgb, {yellow.50}, transparent 5%), color-mix(in srgb, {yellow.500}, transparent 84%))',
        borderColor: 'light-dark({yellow.200}, color-mix(in srgb, {yellow.700}, transparent 64%))',
        color: 'light-dark({yellow.600}, {yellow.500})',
        shadow: '0px 4px 8px 0px color-mix(in srgb, {yellow.500}, transparent 96%)',
      },
      error: {
        background:
          'light-dark(color-mix(in srgb, {red.50}, transparent 5%), color-mix(in srgb, {red.500}, transparent 84%))',
        borderColor: 'light-dark({red.200}, color-mix(in srgb, {red.700}, transparent 64%))',
        color: 'light-dark({red.600}, {red.500})',
        shadow: '0px 4px 8px 0px color-mix(in srgb, {red.500}, transparent 96%)',
      },
      secondary: {
        background: 'light-dark({surface.100}, {surface.800})',
        borderColor: 'light-dark({surface.200}, {surface.700})',
        color: 'light-dark({surface.600}, {surface.300})',
        shadow: '0px 4px 8px 0px color-mix(in srgb, {surface.500}, transparent 96%)',
      },
      contrast: {
        background: 'light-dark({surface.900}, {surface.0})',
        borderColor: 'light-dark({surface.950}, {surface.100})',
        color: 'light-dark({surface.50}, {surface.950})',
        shadow: '0px 4px 8px 0px color-mix(in srgb, {surface.950}, transparent 96%)',
      },
    },
    inplace: {
      root: {
        padding: '{form.field.padding.y} {form.field.padding.x}',
        borderRadius: '{content.border.radius}',
        focusRing: {
          width: '{focus.ring.width}',
          style: '{focus.ring.style}',
          color: '{focus.ring.color}',
          offset: '{focus.ring.offset}',
          shadow: '{focus.ring.shadow}',
        },
        transitionDuration: '{transition.duration}',
      },
      display: {
        hoverBackground: '{content.hover.background}',
        hoverColor: '{content.hover.color}',
      },
    },
    inputchips: {
      root: {
        background: '{form.field.background}',
        disabledBackground: '{form.field.disabled.background}',
        filledBackground: '{form.field.filled.background}',
        filledFocusBackground: '{form.field.filled.focus.background}',
        borderColor: '{form.field.border.color}',
        hoverBorderColor: '{form.field.hover.border.color}',
        focusBorderColor: '{form.field.focus.border.color}',
        invalidBorderColor: '{form.field.invalid.border.color}',
        color: '{form.field.color}',
        disabledColor: '{form.field.disabled.color}',
        placeholderColor: '{form.field.placeholder.color}',
        shadow: '{form.field.shadow}',
        paddingX: '{form.field.padding.x}',
        paddingY: '{form.field.padding.y}',
        borderRadius: '{form.field.border.radius}',
        focusRing: {
          width: '{form.field.focus.ring.width}',
          style: '{form.field.focus.ring.style}',
          color: '{form.field.focus.ring.color}',
          offset: '{form.field.focus.ring.offset}',
          shadow: '{form.field.focus.ring.shadow}',
        },
        transitionDuration: '{form.field.transition.duration}',
      },
      chip: {
        borderRadius: '{border.radius.sm}',
        focusBackground: 'light-dark({surface.200}, {surface.700})',
        color: 'light-dark({surface.800}, {surface.0})',
      },
    },
    inputcolor: {
      root: {
        borderColor: '{content.border.color}',
      },
      area: {
        borderRadius: '{content.border.radius}',
      },
      slider: {
        borderRadius: '{content.border.radius}',
        size: '1rem',
      },
      handle: {
        size: '1rem',
        borderColor: '#ffffff',
        borderWidth: '3px',
        shadow: '0px 0.5px 0px 0px rgba(0, 0, 0, 0.08), 0px 1px 1px 0px rgba(0, 0, 0, 0.14)',
        transitionDuration: '{transition.duration}',
        focusRing: {
          borderWidth: '2px',
          borderColor: '#ffffff',
          outlineWidth: '2px',
          outlineColor: 'rgba(255, 255, 255, 0.3)',
          outlineOffset: '2px',
        },
      },
      transparencyGrid: {
        color: '{surface.100}',
        background: '#ffffff',
        tileSize: '0.5rem',
      },
      swatch: {
        size: '2.25rem',
        borderRadius: '{content.border.radius}',
      },
    },
    inputgroup: {
      addon: {
        background: '{form.field.background}',
        borderColor: '{form.field.border.color}',
        color: '{form.field.icon.color}',
        borderRadius: '{form.field.border.radius}',
        padding: '0 0.5rem',
        minWidth: '2.25rem',
        fontWeight: '{form.field.font.weight}',
        fontSize: '{form.field.font.size}',
      },
    },
    inputnumber: {
      root: {
        transitionDuration: '{transition.duration}',
      },
      button: {
        width: '2.25rem',
        borderRadius: '{form.field.border.radius}',
        verticalPadding: '{form.field.padding.y}',
        background: 'transparent',
        hoverBackground: 'light-dark({surface.100}, {surface.800})',
        activeBackground: 'light-dark({surface.200}, {surface.700})',
        borderColor: '{form.field.border.color}',
        hoverBorderColor: '{form.field.border.color}',
        activeBorderColor: '{form.field.border.color}',
        color: '{surface.400}',
        hoverColor: 'light-dark({surface.500}, {surface.300})',
        activeColor: 'light-dark({surface.600}, {surface.200})',
      },
    },
    inputotp: {
      root: {
        gap: '0.5rem',
      },
      input: {
        width: '2.25rem',
        sm: {
          width: '1.75rem',
        },
        lg: {
          width: '2.625rem',
        },
      },
    },
    inputtags: {
      root: {
        background: '{form.field.background}',
        disabledBackground: '{form.field.disabled.background}',
        filledBackground: '{form.field.filled.background}',
        filledHoverBackground: '{form.field.filled.hover.background}',
        filledFocusBackground: '{form.field.filled.focus.background}',
        borderColor: '{form.field.border.color}',
        hoverBorderColor: '{form.field.hover.border.color}',
        focusBorderColor: '{form.field.focus.border.color}',
        invalidBorderColor: '{form.field.invalid.border.color}',
        color: '{form.field.color}',
        disabledColor: '{form.field.disabled.color}',
        shadow: '{form.field.shadow}',
        paddingX: '{form.field.padding.x}',
        paddingY: '{form.field.padding.y}',
        borderRadius: '{form.field.border.radius}',
        focusRing: {
          width: '{form.field.focus.ring.width}',
          style: '{form.field.focus.ring.style}',
          color: '{form.field.focus.ring.color}',
          offset: '{form.field.focus.ring.offset}',
          shadow: '{form.field.focus.ring.shadow}',
        },
        transitionDuration: '{form.field.transition.duration}',
        gap: '0.25rem',
      },
      item: {
        borderRadius: '{form.field.border.radius}',
      },
    },
    inputtext: {
      root: {
        fontSize: '{form.field.font.size}',
        fontWeight: '{form.field.font.weight}',
        background: '{form.field.background}',
        disabledBackground: '{form.field.disabled.background}',
        filledBackground: '{form.field.filled.background}',
        filledHoverBackground: '{form.field.filled.hover.background}',
        filledFocusBackground: '{form.field.filled.focus.background}',
        borderColor: '{form.field.border.color}',
        hoverBorderColor: '{form.field.hover.border.color}',
        focusBorderColor: '{form.field.focus.border.color}',
        invalidBorderColor: '{form.field.invalid.border.color}',
        color: '{form.field.color}',
        disabledColor: '{form.field.disabled.color}',
        placeholderColor: '{form.field.placeholder.color}',
        invalidPlaceholderColor: '{form.field.invalid.placeholder.color}',
        shadow: '{form.field.shadow}',
        paddingX: '{form.field.padding.x}',
        paddingY: '{form.field.padding.y}',
        borderRadius: '{form.field.border.radius}',
        focusRing: {
          width: '{form.field.focus.ring.width}',
          style: '{form.field.focus.ring.style}',
          color: '{form.field.focus.ring.color}',
          offset: '{form.field.focus.ring.offset}',
          shadow: '{form.field.focus.ring.shadow}',
        },
        transitionDuration: '{form.field.transition.duration}',
        sm: {
          fontSize: '{form.field.sm.font.size}',
          paddingX: '{form.field.sm.padding.x}',
          paddingY: '{form.field.sm.padding.y}',
        },
        lg: {
          fontSize: '{form.field.lg.font.size}',
          paddingX: '{form.field.lg.padding.x}',
          paddingY: '{form.field.lg.padding.y}',
        },
      },
    },
    knob: {
      root: {
        transitionDuration: '{transition.duration}',
        focusRing: {
          width: '{focus.ring.width}',
          style: '{focus.ring.style}',
          color: '{focus.ring.color}',
          offset: '{focus.ring.offset}',
          shadow: '{focus.ring.shadow}',
        },
      },
      value: {
        background: '{primary.color}',
      },
      range: {
        background: '{content.border.color}',
      },
      text: {
        color: '{text.muted.color}',
        fontSize: '1.125rem',
        fontWeight: 'normal',
      },
    },
    label: {
      root: {
        gap: '0.375rem',
        fontSize: '{typography.font.size}',
        fontWeight: '500',
        textColor: '{text.color}',
        disabledOpacity: '{disabled.opacity}',
      },
    },
    listbox: {
      root: {
        background: '{form.field.background}',
        disabledBackground: '{form.field.disabled.background}',
        borderColor: '{form.field.border.color}',
        invalidBorderColor: '{form.field.invalid.border.color}',
        color: '{form.field.color}',
        disabledColor: '{form.field.disabled.color}',
        shadow: '{form.field.shadow}',
        borderRadius: '{form.field.border.radius}',
        transitionDuration: '{form.field.transition.duration}',
      },
      list: {
        padding: '{list.padding}',
        gap: '{list.gap}',
        header: {
          padding: '{list.header.padding}',
        },
      },
      option: {
        fontWeight: '{list.option.font.weight}',
        fontSize: '{list.option.font.size}',
        focusBackground: '{list.option.focus.background}',
        selectedBackground: '{list.option.selected.background}',
        selectedFocusBackground: '{list.option.selected.focus.background}',
        color: '{list.option.color}',
        focusColor: '{list.option.focus.color}',
        selectedColor: '{list.option.selected.color}',
        selectedFocusColor: '{list.option.selected.focus.color}',
        selectedFontWeight: '{list.option.selected.font.weight}',
        padding: '{list.option.padding}',
        borderRadius: '{list.option.border.radius}',
        stripedBackground: 'light-dark({surface.50}, {surface.900})',
      },
      optionGroup: {
        background: '{list.option.group.background}',
        color: '{list.option.group.color}',
        padding: '{list.option.group.padding}',
        fontWeight: '{list.option.group.font.weight}',
        fontSize: '{list.option.group.font.size}',
      },
      checkmark: {
        color: '{list.option.color}',
        gutterStart: '-0.25rem',
        gutterEnd: '0.25rem',
      },
      emptyMessage: {
        padding: '{list.option.padding}',
      },
    },
    megamenu: {
      root: {
        background: '{content.background}',
        borderColor: '{content.border.color}',
        borderRadius: '{content.border.radius}',
        color: '{content.color}',
        gap: '0.5rem',
        verticalOrientation: {
          padding: '{navigation.list.padding}',
          gap: '{navigation.list.gap}',
        },
        horizontalOrientation: {
          padding: '0.375rem 0.625rem',
          gap: '0.5rem',
        },
        transitionDuration: '{navigation.item.transition.duration}',
      },
      baseItem: {
        borderRadius: '{content.border.radius}',
        padding: '{navigation.item.padding}',
      },
      item: {
        focusBackground: '{navigation.item.focus.background}',
        activeBackground: '{navigation.item.active.background}',
        color: '{navigation.item.color}',
        focusColor: '{navigation.item.focus.color}',
        activeColor: '{navigation.item.active.color}',
        padding: '{navigation.item.padding}',
        borderRadius: '{navigation.item.border.radius}',
        gap: '{navigation.item.gap}',
        icon: {
          color: '{navigation.item.icon.color}',
          focusColor: '{navigation.item.icon.focus.color}',
          activeColor: '{navigation.item.icon.active.color}',
          size: '{navigation.item.icon.size}',
        },
        label: {
          fontWeight: '{navigation.item.label.font.weight}',
          fontSize: '{navigation.item.label.font.size}',
        },
      },
      overlay: {
        padding: '0',
        background: '{content.background}',
        borderColor: '{content.border.color}',
        borderRadius: '{content.border.radius}',
        color: '{content.color}',
        shadow: '{overlay.navigation.shadow}',
        gap: '0.5rem',
      },
      submenu: {
        padding: '{navigation.list.padding}',
        gap: '{navigation.list.gap}',
      },
      submenuLabel: {
        padding: '{navigation.submenu.label.padding}',
        fontWeight: '{navigation.submenu.label.font.weight}',
        fontSize: '{navigation.submenu.label.font.size}',
        background: '{navigation.submenu.label.background}',
        color: '{navigation.submenu.label.color}',
      },
      submenuIcon: {
        size: '{navigation.submenu.icon.size}',
        color: '{navigation.submenu.icon.color}',
        focusColor: '{navigation.submenu.icon.focus.color}',
        activeColor: '{navigation.submenu.icon.active.color}',
      },
      separator: {
        borderColor: '{content.border.color}',
      },
      mobileButton: {
        borderRadius: '50%',
        size: '1.5rem',
        color: '{text.muted.color}',
        hoverColor: '{text.hover.muted.color}',
        hoverBackground: '{content.hover.background}',
        focusRing: {
          width: '{focus.ring.width}',
          style: '{focus.ring.style}',
          color: '{focus.ring.color}',
          offset: '{focus.ring.offset}',
          shadow: '{focus.ring.shadow}',
        },
      },
    },
    menu: {
      root: {
        background: '{content.background}',
        borderColor: '{content.border.color}',
        color: '{content.color}',
        borderRadius: '{content.border.radius}',
        shadow: '{overlay.navigation.shadow}',
        transitionDuration: '{navigation.item.transition.duration}',
      },
      list: {
        padding: '{navigation.list.padding}',
        gap: '{navigation.list.gap}',
      },
      item: {
        focusBackground: '{navigation.item.focus.background}',
        color: '{navigation.item.color}',
        focusColor: '{navigation.item.focus.color}',
        padding: '{navigation.item.padding}',
        borderRadius: '{navigation.item.border.radius}',
        gap: '{navigation.item.gap}',
        icon: {
          color: '{navigation.item.icon.color}',
          focusColor: '{navigation.item.icon.focus.color}',
          size: '{navigation.item.icon.size}',
        },
        label: {
          fontWeight: '{navigation.item.label.font.weight}',
          fontSize: '{navigation.item.label.font.size}',
        },
      },
      submenuLabel: {
        padding: '{navigation.submenu.label.padding}',
        fontWeight: '{navigation.submenu.label.font.weight}',
        fontSize: '{navigation.submenu.label.font.size}',
        background: '{navigation.submenu.label.background}',
        color: '{navigation.submenu.label.color}',
      },
      submenuIcon: {
        size: '{navigation.submenu.icon.size}',
        color: '{navigation.submenu.icon.color}',
        focusColor: '{navigation.submenu.icon.focus.color}',
      },
      separator: {
        borderColor: '{content.border.color}',
      },
    },
    menubar: {
      root: {
        background: '{content.background}',
        borderColor: '{content.border.color}',
        borderRadius: '{content.border.radius}',
        color: '{content.color}',
        gap: '0.5rem',
        padding: '0.375rem 0.625rem',
        transitionDuration: '{navigation.item.transition.duration}',
      },
      baseItem: {
        borderRadius: '{content.border.radius}',
        padding: '{navigation.item.padding}',
      },
      item: {
        focusBackground: '{navigation.item.focus.background}',
        activeBackground: '{navigation.item.active.background}',
        color: '{navigation.item.color}',
        focusColor: '{navigation.item.focus.color}',
        activeColor: '{navigation.item.active.color}',
        padding: '{navigation.item.padding}',
        borderRadius: '{navigation.item.border.radius}',
        gap: '{navigation.item.gap}',
        icon: {
          color: '{navigation.item.icon.color}',
          focusColor: '{navigation.item.icon.focus.color}',
          activeColor: '{navigation.item.icon.active.color}',
          size: '{navigation.item.icon.size}',
        },
        label: {
          fontWeight: '{navigation.item.label.font.weight}',
          fontSize: '{navigation.item.label.font.size}',
        },
      },
      submenu: {
        padding: '{navigation.list.padding}',
        gap: '{navigation.list.gap}',
        background: '{content.background}',
        borderColor: '{content.border.color}',
        borderRadius: '{content.border.radius}',
        shadow: '{overlay.navigation.shadow}',
        mobileIndent: '0.875rem',
        icon: {
          size: '{navigation.submenu.icon.size}',
          color: '{navigation.submenu.icon.color}',
          focusColor: '{navigation.submenu.icon.focus.color}',
          activeColor: '{navigation.submenu.icon.active.color}',
        },
      },
      separator: {
        borderColor: '{content.border.color}',
      },
      mobileButton: {
        borderRadius: '50%',
        size: '1.5rem',
        color: '{text.muted.color}',
        hoverColor: '{text.hover.muted.color}',
        hoverBackground: '{content.hover.background}',
        focusRing: {
          width: '{focus.ring.width}',
          style: '{focus.ring.style}',
          color: '{focus.ring.color}',
          offset: '{focus.ring.offset}',
          shadow: '{focus.ring.shadow}',
        },
      },
    },
    message: {
      root: {
        borderRadius: '{content.border.radius}',
        borderWidth: '1px',
        transitionDuration: '{transition.duration}',
      },
      content: {
        padding: '0.375rem 0.625rem',
        gap: '0.5rem',
        sm: {
          padding: '0.25rem 0.5rem',
        },
        lg: {
          padding: '0.5rem 0.75rem',
        },
      },
      text: {
        fontSize: '{typography.font.size}',
        fontWeight: '500',
        sm: {
          fontSize: '0.75rem',
        },
        lg: {
          fontSize: '1rem',
        },
      },
      icon: {
        size: '1rem',
        sm: {
          size: '0.875rem',
        },
        lg: {
          size: '1.125rem',
        },
      },
      closeButton: {
        width: '1.5rem',
        height: '1.5rem',
        borderRadius: '50%',
        focusRing: {
          width: '{focus.ring.width}',
          style: '{focus.ring.style}',
          offset: '{focus.ring.offset}',
        },
      },
      closeIcon: {
        size: '0.875rem',
        sm: {
          size: '0.75rem',
        },
        lg: {
          size: '1rem',
        },
      },
      outlined: {
        root: {
          borderWidth: '1px',
        },
      },
      simple: {
        content: {
          padding: '0',
        },
      },
      info: {
        background:
          'light-dark(color-mix(in srgb, {blue.50}, transparent 5%), color-mix(in srgb, {blue.500}, transparent 84%))',
        borderColor: 'light-dark({blue.200}, color-mix(in srgb, {blue.700}, transparent 64%))',
        color: 'light-dark({blue.600}, {blue.500})',
        shadow: '0px 4px 8px 0px color-mix(in srgb, {blue.500}, transparent 96%)',
        closeButton: {
          hoverBackground: 'light-dark({blue.100}, rgba(255, 255, 255, 0.05))',
          focusRing: {
            color: 'light-dark({blue.600}, {blue.500})',
            shadow: 'none',
          },
        },
        outlined: {
          color: 'light-dark({blue.600}, {blue.500})',
          borderColor: 'light-dark({blue.600}, {blue.500})',
        },
        simple: {
          color: 'light-dark({blue.600}, {blue.500})',
        },
      },
      success: {
        background:
          'light-dark(color-mix(in srgb, {green.50}, transparent 5%), color-mix(in srgb, {green.500}, transparent 84%))',
        borderColor: 'light-dark({green.200}, color-mix(in srgb, {green.700}, transparent 64%))',
        color: 'light-dark({green.600}, {green.500})',
        shadow: '0px 4px 8px 0px color-mix(in srgb, {green.500}, transparent 96%)',
        closeButton: {
          hoverBackground: 'light-dark({green.100}, rgba(255, 255, 255, 0.05))',
          focusRing: {
            color: 'light-dark({green.600}, {green.500})',
            shadow: 'none',
          },
        },
        outlined: {
          color: 'light-dark({green.600}, {green.500})',
          borderColor: 'light-dark({green.600}, {green.500})',
        },
        simple: {
          color: 'light-dark({green.600}, {green.500})',
        },
      },
      warn: {
        background:
          'light-dark(color-mix(in srgb, {yellow.50}, transparent 5%), color-mix(in srgb, {yellow.500}, transparent 84%))',
        borderColor: 'light-dark({yellow.200}, color-mix(in srgb, {yellow.700}, transparent 64%))',
        color: 'light-dark({yellow.600}, {yellow.500})',
        shadow: '0px 4px 8px 0px color-mix(in srgb, {yellow.500}, transparent 96%)',
        closeButton: {
          hoverBackground: 'light-dark({yellow.100}, rgba(255, 255, 255, 0.05))',
          focusRing: {
            color: 'light-dark({yellow.600}, {yellow.500})',
            shadow: 'none',
          },
        },
        outlined: {
          color: 'light-dark({yellow.600}, {yellow.500})',
          borderColor: 'light-dark({yellow.600}, {yellow.500})',
        },
        simple: {
          color: 'light-dark({yellow.600}, {yellow.500})',
        },
      },
      error: {
        background:
          'light-dark(color-mix(in srgb, {red.50}, transparent 5%), color-mix(in srgb, {red.500}, transparent 84%))',
        borderColor: 'light-dark({red.200}, color-mix(in srgb, {red.700}, transparent 64%))',
        color: 'light-dark({red.600}, {red.500})',
        shadow: '0px 4px 8px 0px color-mix(in srgb, {red.500}, transparent 96%)',
        closeButton: {
          hoverBackground: 'light-dark({red.100}, rgba(255, 255, 255, 0.05))',
          focusRing: {
            color: 'light-dark({red.600}, {red.500})',
            shadow: 'none',
          },
        },
        outlined: {
          color: 'light-dark({red.600}, {red.500})',
          borderColor: 'light-dark({red.600}, {red.500})',
        },
        simple: {
          color: 'light-dark({red.600}, {red.500})',
        },
      },
      secondary: {
        background: 'light-dark({surface.100}, {surface.800})',
        borderColor: 'light-dark({surface.200}, {surface.700})',
        color: 'light-dark({surface.600}, {surface.300})',
        shadow: '0px 4px 8px 0px color-mix(in srgb, {surface.500}, transparent 96%)',
        closeButton: {
          hoverBackground: 'light-dark({surface.200}, {surface.700})',
          focusRing: {
            color: 'light-dark({surface.600}, {surface.300})',
            shadow: 'none',
          },
        },
        outlined: {
          color: 'light-dark({surface.500}, {surface.400})',
          borderColor: 'light-dark({surface.500}, {surface.400})',
        },
        simple: {
          color: 'light-dark({surface.500}, {surface.400})',
        },
      },
      contrast: {
        background: 'light-dark({surface.900}, {surface.0})',
        borderColor: 'light-dark({surface.950}, {surface.100})',
        color: 'light-dark({surface.50}, {surface.950})',
        shadow: '0px 4px 8px 0px color-mix(in srgb, {surface.950}, transparent 96%)',
        closeButton: {
          hoverBackground: 'light-dark({surface.800}, {surface.100})',
          focusRing: {
            color: 'light-dark({surface.50}, {surface.950})',
            shadow: 'none',
          },
        },
        outlined: {
          color: 'light-dark({surface.950}, {surface.0})',
          borderColor: 'light-dark({surface.950}, {surface.0})',
        },
        simple: {
          color: 'light-dark({surface.950}, {surface.0})',
        },
      },
    },
    metergroup: {
      root: {
        borderRadius: '{content.border.radius}',
        gap: '0.875rem',
      },
      meters: {
        background: '{content.border.color}',
        size: '0.375rem',
      },
      label: {
        gap: '0.375rem',
      },
      labelMarker: {
        size: '0.375rem',
      },
      labelText: {
        fontWeight: '{typography.font.weight}',
        fontSize: '{typography.font.size}',
      },
      labelIcon: {
        size: '0.875rem',
      },
      labelList: {
        verticalGap: '0.375rem',
        horizontalGap: '0.875rem',
      },
    },
    multiselect: {
      root: {
        fontSize: '{form.field.font.size}',
        fontWeight: '{form.field.font.weight}',
        background: '{form.field.background}',
        disabledBackground: '{form.field.disabled.background}',
        filledBackground: '{form.field.filled.background}',
        filledHoverBackground: '{form.field.filled.hover.background}',
        filledFocusBackground: '{form.field.filled.focus.background}',
        borderColor: '{form.field.border.color}',
        hoverBorderColor: '{form.field.hover.border.color}',
        focusBorderColor: '{form.field.focus.border.color}',
        invalidBorderColor: '{form.field.invalid.border.color}',
        color: '{form.field.color}',
        disabledColor: '{form.field.disabled.color}',
        placeholderColor: '{form.field.placeholder.color}',
        invalidPlaceholderColor: '{form.field.invalid.placeholder.color}',
        shadow: '{form.field.shadow}',
        paddingX: '{form.field.padding.x}',
        paddingY: '{form.field.padding.y}',
        borderRadius: '{form.field.border.radius}',
        focusRing: {
          width: '{form.field.focus.ring.width}',
          style: '{form.field.focus.ring.style}',
          color: '{form.field.focus.ring.color}',
          offset: '{form.field.focus.ring.offset}',
          shadow: '{form.field.focus.ring.shadow}',
        },
        transitionDuration: '{form.field.transition.duration}',
        sm: {
          fontSize: '{form.field.sm.font.size}',
          paddingX: '{form.field.sm.padding.x}',
          paddingY: '{form.field.sm.padding.y}',
        },
        lg: {
          fontSize: '{form.field.lg.font.size}',
          paddingX: '{form.field.lg.padding.x}',
          paddingY: '{form.field.lg.padding.y}',
        },
      },
      dropdown: {
        width: '2.25rem',
        color: '{form.field.icon.color}',
      },
      overlay: {
        background: '{overlay.select.background}',
        borderColor: '{overlay.select.border.color}',
        borderRadius: '{overlay.select.border.radius}',
        color: '{overlay.select.color}',
        shadow: '{overlay.select.shadow}',
      },
      list: {
        padding: '{list.padding}',
        gap: '{list.gap}',
        header: {
          padding: '0.5rem 0.5rem 0.125rem 0.875rem',
        },
      },
      option: {
        fontSize: '{list.option.font.size}',
        fontWeight: '{list.option.font.weight}',
        focusBackground: '{list.option.focus.background}',
        selectedBackground: 'transparent',
        selectedFocusBackground: 'transparent',
        color: '{list.option.color}',
        focusColor: '{list.option.color}',
        selectedColor: '{list.option.color}',
        selectedFocusColor: '{list.option.color}',
        selectedFontWeight: '{list.option.selected.font.weight}',
        padding: '{list.option.padding}',
        borderRadius: '{list.option.border.radius}',
        gap: '0.5rem',
      },
      optionGroup: {
        background: '{list.option.group.background}',
        color: '{list.option.group.color}',
        fontWeight: '{list.option.group.font.weight}',
        fontSize: '{list.option.group.font.size}',
        padding: '{list.option.group.padding}',
      },
      chip: {
        borderRadius: '{border.radius.sm}',
      },
      clearIcon: {
        color: '{form.field.icon.color}',
      },
      emptyMessage: {
        padding: '{list.option.padding}',
      },
    },
    navigationmenu: {
      root: {
        padding: '0.375rem 0.625rem',
        gap: '0.25rem',
      },
      baseItem: {
        padding: '{navigation.item.padding}',
        borderRadius: '{content.border.radius}',
        gap: '{navigation.item.gap}',
        fontSize: '{navigation.item.label.font.size}',
        fontWeight: '500',
        color: '{navigation.item.color}',
        focusColor: '{navigation.item.focus.color}',
        focusBackground: '{navigation.item.focus.background}',
        activeColor: '{navigation.item.active.color}',
        activeBackground: '{navigation.item.active.background}',
        transitionDuration: '{navigation.item.transition.duration}',
      },
    },
    orderlist: {
      root: {
        gap: '1rem',
      },
      controls: {
        gap: '0.5rem',
      },
    },
    organizationchart: {
      root: {
        gutter: '0.625rem',
        transitionDuration: '{transition.duration}',
      },
      node: {
        background: '{content.background}',
        hoverBackground: '{content.hover.background}',
        selectedBackground: '{highlight.background}',
        borderColor: '{content.border.color}',
        color: '{content.color}',
        selectedColor: '{highlight.color}',
        hoverColor: '{content.hover.color}',
        padding: '0.875rem 1rem',
        toggleablePadding: '0.875rem 1rem 1.375rem 1rem',
        borderRadius: '{content.border.radius}',
        fontSize: '{typography.font.size}',
        fontWeight: '{typography.font.weight}',
        focusRing: {
          width: '{focus.ring.width}',
          style: '{focus.ring.style}',
          color: '{focus.ring.color}',
          offset: '{focus.ring.offset}',
          shadow: '{focus.ring.shadow}',
        },
      },
      nodeToggleButton: {
        background: '{content.background}',
        hoverBackground: '{content.hover.background}',
        borderColor: '{content.border.color}',
        color: '{text.muted.color}',
        hoverColor: '{text.color}',
        size: '1.25rem',
        borderRadius: '50%',
        focusRing: {
          width: '{focus.ring.width}',
          style: '{focus.ring.style}',
          color: '{focus.ring.color}',
          offset: '{focus.ring.offset}',
          shadow: '{focus.ring.shadow}',
        },
        icon: {
          size: '0.75rem',
        },
      },
      connector: {
        color: '{surface.300}',
        borderRadius: '{content.border.radius}',
        height: '24px',
      },
    },
    overlaybadge: {
      root: {
        outline: {
          width: '2px',
          color: '{content.background}',
        },
      },
    },
    paginator: {
      root: {
        padding: '0.375rem 0.875rem',
        gap: '0.25rem',
        borderRadius: '{content.border.radius}',
        background: '{content.background}',
        color: '{content.color}',
        transitionDuration: '{transition.duration}',
      },
      navButton: {
        background: 'transparent',
        hoverBackground: '{content.hover.background}',
        selectedBackground: '{highlight.background}',
        color: '{text.muted.color}',
        hoverColor: '{text.hover.muted.color}',
        selectedColor: '{highlight.color}',
        width: '2.25rem',
        height: '2.25rem',
        borderRadius: '50%',
        fontWeight: '{typography.font.weight}',
        fontSize: '{typography.font.size}',
        focusRing: {
          width: '{focus.ring.width}',
          style: '{focus.ring.style}',
          color: '{focus.ring.color}',
          offset: '{focus.ring.offset}',
          shadow: '{focus.ring.shadow}',
        },
      },
      currentPageReport: {
        color: '{text.muted.color}',
        fontWeight: '{typography.font.weight}',
        fontSize: '{typography.font.size}',
      },
      jumpToPageInput: {
        maxWidth: '2.25rem',
      },
    },
    panel: {
      root: {
        background: '{content.background}',
        borderColor: '{content.border.color}',
        color: '{content.color}',
        borderRadius: '{content.border.radius}',
      },
      header: {
        background: 'transparent',
        color: '{text.color}',
        padding: '1rem',
        borderColor: '{content.border.color}',
        borderWidth: '0',
        borderRadius: '0',
      },
      toggleableHeader: {
        padding: '0.375rem 1rem',
      },
      title: {
        fontWeight: '600',
        fontSize: '{typography.font.size}',
      },
      content: {
        padding: '0 1rem 1rem 1rem',
      },
      footer: {
        padding: '0 1rem 1rem 1rem',
      },
    },
    panelmenu: {
      root: {
        gap: '0.5rem',
        transitionDuration: '{navigation.item.transition.duration}',
      },
      panel: {
        background: '{content.background}',
        borderColor: '{content.border.color}',
        borderWidth: '1px',
        color: '{content.color}',
        padding: '0.25rem 0.25rem',
        borderRadius: '{content.border.radius}',
        first: {
          borderWidth: '1px',
          topBorderRadius: '{content.border.radius}',
        },
        last: {
          borderWidth: '1px',
          bottomBorderRadius: '{content.border.radius}',
        },
      },
      item: {
        focusBackground: '{navigation.item.focus.background}',
        color: '{navigation.item.color}',
        focusColor: '{navigation.item.focus.color}',
        gap: '0.5rem',
        padding: '{navigation.item.padding}',
        borderRadius: '{content.border.radius}',
        icon: {
          color: '{navigation.item.icon.color}',
          focusColor: '{navigation.item.icon.focus.color}',
          size: '{navigation.item.icon.size}',
        },
        label: {
          fontWeight: '{navigation.item.label.font.weight}',
          fontSize: '{navigation.item.label.font.size}',
        },
      },
      submenu: {
        indent: '1rem',
      },
      submenuIcon: {
        color: '{navigation.submenu.icon.color}',
        focusColor: '{navigation.submenu.icon.focus.color}',
      },
    },
    password: {
      meter: {
        background: '{content.border.color}',
        borderRadius: '{content.border.radius}',
        height: '0.625rem',
      },
      icon: {
        color: '{form.field.icon.color}',
      },
      overlay: {
        background: '{overlay.popover.background}',
        borderColor: '{overlay.popover.border.color}',
        borderRadius: '{overlay.popover.border.radius}',
        color: '{overlay.popover.color}',
        padding: '{overlay.popover.padding}',
        shadow: '{overlay.popover.shadow}',
      },
      content: {
        gap: '0.5rem',
      },
      meterText: {
        fontSize: '{typography.font.size}',
        fontWeight: '{typography.font.weight}',
      },
      strength: {
        weakBackground: 'light-dark({red.500}, {red.400})',
        mediumBackground: 'light-dark({amber.500}, {amber.400})',
        strongBackground: 'light-dark({green.500}, {green.400})',
      },
    },
    picklist: {
      root: {
        gap: '1rem',
      },
      controls: {
        gap: '0.5rem',
      },
    },
    popover: {
      root: {
        background: '{overlay.popover.background}',
        borderColor: '{overlay.popover.border.color}',
        color: '{overlay.popover.color}',
        borderRadius: '{overlay.popover.border.radius}',
        shadow: '{overlay.popover.shadow}',
        gutter: '10px',
        arrowOffset: '1.125rem',
      },
      content: {
        padding: '{overlay.popover.padding}',
      },
    },
    progressbar: {
      root: {
        background: '{content.border.color}',
        borderRadius: '{content.border.radius}',
        height: '1.125rem',
      },
      value: {
        background: '{primary.color}',
      },
      label: {
        color: '{primary.contrast.color}',
        fontSize: '0.625rem',
        fontWeight: '600',
      },
    },
    progressspinner: {
      root: {
        colorOne: 'light-dark({red.500}, {red.400})',
        colorTwo: 'light-dark({blue.500}, {blue.400})',
        colorThree: 'light-dark({green.500}, {green.400})',
        colorFour: 'light-dark({yellow.500}, {yellow.400})',
      },
    },
    radiobutton: {
      root: {
        width: '1.125rem',
        height: '1.125rem',
        background: '{form.field.background}',
        checkedBackground: '{primary.color}',
        checkedHoverBackground: '{primary.hover.color}',
        disabledBackground: '{form.field.disabled.background}',
        filledBackground: '{form.field.filled.background}',
        borderColor: '{form.field.border.color}',
        hoverBorderColor: '{form.field.hover.border.color}',
        focusBorderColor: '{form.field.border.color}',
        checkedBorderColor: '{primary.color}',
        checkedHoverBorderColor: '{primary.hover.color}',
        checkedFocusBorderColor: '{primary.color}',
        checkedDisabledBorderColor: '{form.field.border.color}',
        invalidBorderColor: '{form.field.invalid.border.color}',
        shadow: '{form.field.shadow}',
        focusRing: {
          width: '{focus.ring.width}',
          style: '{focus.ring.style}',
          color: '{focus.ring.color}',
          offset: '{focus.ring.offset}',
          shadow: '{focus.ring.shadow}',
        },
        transitionDuration: '{form.field.transition.duration}',
        sm: {
          width: '0.875rem',
          height: '0.875rem',
        },
        lg: {
          width: '1.25rem',
          height: '1.25rem',
        },
      },
      icon: {
        size: '0.625rem',
        checkedColor: '{primary.contrast.color}',
        checkedHoverColor: '{primary.contrast.color}',
        disabledColor: '{form.field.disabled.color}',
        sm: {
          size: '0.5rem',
        },
        lg: {
          size: '0.75rem',
        },
      },
    },
    rating: {
      root: {
        gap: '0.25rem',
        transitionDuration: '{transition.duration}',
        focusRing: {
          width: '{focus.ring.width}',
          style: '{focus.ring.style}',
          color: '{focus.ring.color}',
          offset: '{focus.ring.offset}',
          shadow: '{focus.ring.shadow}',
        },
      },
      icon: {
        size: '1rem',
        color: '{text.muted.color}',
        hoverColor: '{primary.color}',
        activeColor: '{primary.color}',
      },
    },
    ripple: {
      root: {
        background: 'light-dark(rgba(0,0,0,0.1), rgba(255,255,255,0.3))',
      },
    },
    scrollarea: {
      root: {
        background: '{content.background}',
        borderColor: '{content.border.color}',
        borderRadius: '{content.border.radius}',
        focusRing: {
          width: '{focus.ring.width}',
          style: '{focus.ring.style}',
          color: '{focus.ring.color}',
          offset: '{focus.ring.offset}',
          shadow: '{focus.ring.shadow}',
        },
      },
      viewport: {
        padding: '1rem',
      },
      scrollbar: {
        background: 'transparent',
        margin: '0.25rem',
        size: '0.25rem',
        transitionDuration: '{transition.duration}',
      },
      handle: {
        background: '{content.border.color}',
      },
      mask: {
        fadeSize: '40px',
      },
    },
    scrollpanel: {
      root: {
        transitionDuration: '{transition.duration}',
      },
      bar: {
        size: '9px',
        borderRadius: '{border.radius.sm}',
        background: 'light-dark({surface.100}, {surface.800})',
        focusRing: {
          width: '{focus.ring.width}',
          style: '{focus.ring.style}',
          color: '{focus.ring.color}',
          offset: '{focus.ring.offset}',
          shadow: '{focus.ring.shadow}',
        },
      },
    },
    select: {
      root: {
        fontSize: '{form.field.font.size}',
        fontWeight: '{form.field.font.weight}',
        background: '{form.field.background}',
        disabledBackground: '{form.field.disabled.background}',
        filledBackground: '{form.field.filled.background}',
        filledHoverBackground: '{form.field.filled.hover.background}',
        filledFocusBackground: '{form.field.filled.focus.background}',
        borderColor: '{form.field.border.color}',
        hoverBorderColor: '{form.field.hover.border.color}',
        focusBorderColor: '{form.field.focus.border.color}',
        invalidBorderColor: '{form.field.invalid.border.color}',
        color: '{form.field.color}',
        disabledColor: '{form.field.disabled.color}',
        placeholderColor: '{form.field.placeholder.color}',
        invalidPlaceholderColor: '{form.field.invalid.placeholder.color}',
        shadow: '{form.field.shadow}',
        paddingX: '{form.field.padding.x}',
        paddingY: '{form.field.padding.y}',
        borderRadius: '{form.field.border.radius}',
        focusRing: {
          width: '{form.field.focus.ring.width}',
          style: '{form.field.focus.ring.style}',
          color: '{form.field.focus.ring.color}',
          offset: '{form.field.focus.ring.offset}',
          shadow: '{form.field.focus.ring.shadow}',
        },
        transitionDuration: '{form.field.transition.duration}',
        sm: {
          fontSize: '{form.field.sm.font.size}',
          paddingX: '{form.field.sm.padding.x}',
          paddingY: '{form.field.sm.padding.y}',
        },
        lg: {
          fontSize: '{form.field.lg.font.size}',
          paddingX: '{form.field.lg.padding.x}',
          paddingY: '{form.field.lg.padding.y}',
        },
      },
      dropdown: {
        width: '2.25rem',
        color: '{form.field.icon.color}',
      },
      overlay: {
        background: '{overlay.select.background}',
        borderColor: '{overlay.select.border.color}',
        borderRadius: '{overlay.select.border.radius}',
        color: '{overlay.select.color}',
        shadow: '{overlay.select.shadow}',
      },
      list: {
        padding: '{list.padding}',
        gap: '{list.gap}',
        header: {
          padding: '{list.header.padding}',
        },
      },
      option: {
        fontSize: '{list.option.font.size}',
        fontWeight: '{list.option.font.weight}',
        focusBackground: '{list.option.focus.background}',
        selectedBackground: '{list.option.selected.background}',
        selectedFocusBackground: '{list.option.selected.focus.background}',
        color: '{list.option.color}',
        focusColor: '{list.option.focus.color}',
        selectedColor: '{list.option.selected.color}',
        selectedFocusColor: '{list.option.selected.focus.color}',
        selectedFontWeight: '{list.option.selected.font.weight}',
        padding: '{list.option.padding}',
        borderRadius: '{list.option.border.radius}',
      },
      optionGroup: {
        background: '{list.option.group.background}',
        color: '{list.option.group.color}',
        fontWeight: '{list.option.group.font.weight}',
        fontSize: '{list.option.group.font.size}',
        padding: '{list.option.group.padding}',
      },
      clearIcon: {
        color: '{form.field.icon.color}',
      },
      checkmark: {
        color: '{list.option.color}',
        gutterStart: '-0.25rem',
        gutterEnd: '0.25rem',
      },
      emptyMessage: {
        padding: '{list.option.padding}',
      },
    },
    selectbutton: {
      root: {
        borderRadius: '{form.field.border.radius}',
        invalidBorderColor: '{form.field.invalid.border.color}',
      },
    },
    sidebar: {
      root: {
        borderColor: '{content.border.color}',
        focusRing: {
          width: '{focus.ring.width}',
          style: '{focus.ring.style}',
          color: '{focus.ring.color}',
          offset: '{focus.ring.offset}',
          shadow: '{focus.ring.shadow}',
        },
      },
      layout: {
        background: 'var(--au-panel)',
      },
      header: {
        padding: '0.5rem',
        gap: '0.5rem',
      },
      footer: {
        padding: '0.5rem',
        gap: '0.5rem',
      },
      content: {
        gap: '0.125rem',
      },
      aside: {
        padding: '0.5rem',
      },
      panel: {
        background: 'var(--au-panel)',
        color: '{content.color}',
        floatingBorderRadius: '{content.border.radius}',
        floatingShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      },
      group: {
        padding: '0.5rem',
      },
      groupLabel: {
        padding: '0 0.5rem',
        height: '2rem',
        borderRadius: '{content.border.radius}',
        fontSize: '0.75rem',
        fontWeight: '500',
        color: '{text.muted.color}',
      },
      groupAction: {
        top: '0.875rem',
        right: '0.75rem',
        size: '1.25rem',
        borderRadius: '{content.border.radius}',
        color: '{navigation.item.icon.color}',
        focusColor: '{navigation.item.icon.focus.color}',
        focusBackground: '{navigation.item.focus.background}',
        icon: {
          size: '{navigation.item.icon.size}',
        },
      },
      menu: {
        gap: '{navigation.list.gap}',
      },
      menuButton: {
        padding: '0.25rem 0.75rem',
        gap: '0.75rem',
        height: '2.375rem',
        borderRadius: '8px',
        fontSize: '{navigation.item.label.font.size}',
        fontWeight: '{navigation.item.label.font.weight}',
        color: '{navigation.item.color}',
        focusBackground: '{navigation.item.focus.background}',
        focusColor: '{navigation.item.focus.color}',
        activeBackground: 'var(--au-active)',
        activeColor: '{primary.color}',
        iconOnlyWidth: '2.375rem',
        withActionPaddingEnd: '2rem',
        icon: {
          color: '{navigation.item.icon.color}',
          focusColor: '{navigation.item.icon.focus.color}',
          size: '{navigation.item.icon.size}',
        },
      },
      menuAction: {
        top: '0.375rem',
        right: '0.25rem',
        width: '1.25rem',
        borderRadius: '{content.border.radius}',
        color: '{navigation.item.icon.color}',
        focusColor: '{navigation.item.icon.focus.color}',
        focusBackground: '{navigation.item.focus.background}',
        icon: {
          size: '{navigation.item.icon.size}',
        },
      },
      menuBadge: {
        top: '0.375rem',
        right: '0.25rem',
        height: '1.25rem',
        minWidth: '1.25rem',
        borderRadius: '0.375rem',
        padding: '0 0.25rem',
        fontSize: '0.75rem',
        fontWeight: '500',
        background: '{content.hover.background}',
        borderColor: '{content.border.color}',
        color: '{text.muted.color}',
      },
      menuSub: {
        paddingBlock: '0.125rem',
        gap: '0.125rem',
        indentMargin: '0.875rem',
        indentPadding: '0.625rem',
        collapsibleIndent: '1.5rem',
        collapsibleTopMargin: '0.125rem',
        collapsibleBorderRadius: '0.375rem',
      },
      menuSubButton: {
        padding: '{navigation.item.padding}',
        gap: '{navigation.item.gap}',
        height: '2rem',
        borderRadius: '{navigation.item.border.radius}',
        fontSize: '{navigation.item.label.font.size}',
        fontWeight: '{navigation.item.label.font.weight}',
        color: '{navigation.item.color}',
        focusBackground: '{navigation.item.focus.background}',
        focusColor: '{navigation.item.focus.color}',
        activeBackground: 'var(--au-active)',
        activeColor: '{primary.color}',
        icon: {
          color: '{navigation.item.icon.color}',
          focusColor: '{navigation.item.icon.focus.color}',
          size: '{navigation.item.icon.size}',
        },
      },
      main: {
        background: 'var(--au-bg)',
        floatingBackground: 'var(--au-bg)',
        insetBackground: 'var(--au-bg)',
        margin: '0.5rem',
        borderRadius: '{content.border.radius}',
        shadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      },
    },
    skeleton: {
      root: {
        borderRadius: '{content.border.radius}',
        background: 'light-dark({surface.200}, rgba(255, 255, 255, 0.06))',
        animationBackground: 'light-dark(rgba(255,255,255,0.4), rgba(255, 255, 255, 0.04))',
      },
    },
    slider: {
      root: {
        transitionDuration: '{transition.duration}',
      },
      track: {
        background: '{content.border.color}',
        borderRadius: '{content.border.radius}',
        size: '3px',
      },
      range: {
        background: '{primary.color}',
      },
      handle: {
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        background: '{content.border.color}',
        hoverBackground: '{content.border.color}',
        content: {
          borderRadius: '50%',
          background: 'light-dark({surface.0}, {surface.950})',
          hoverBackground: '{content.background}',
          width: '16px',
          height: '16px',
          shadow: '0px 0.5px 0px 0px rgba(0, 0, 0, 0.08), 0px 1px 1px 0px rgba(0, 0, 0, 0.14)',
        },
        focusRing: {
          width: '{focus.ring.width}',
          style: '{focus.ring.style}',
          color: '{focus.ring.color}',
          offset: '{focus.ring.offset}',
          shadow: '{focus.ring.shadow}',
        },
      },
    },
    speeddial: {
      root: {
        gap: '0.5rem',
        transitionDuration: '{transition.duration}',
      },
    },
    splitbutton: {
      root: {
        borderRadius: '{form.field.border.radius}',
        roundedBorderRadius: '2rem',
        raisedShadow:
          '0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12)',
      },
    },
    splitter: {
      root: {
        background: '{content.background}',
        borderColor: '{content.border.color}',
        color: '{content.color}',
        transitionDuration: '{transition.duration}',
      },
      gutter: {
        background: '{content.border.color}',
      },
      handle: {
        size: '24px',
        background: 'transparent',
        borderRadius: '{content.border.radius}',
        focusRing: {
          width: '{focus.ring.width}',
          style: '{focus.ring.style}',
          color: '{focus.ring.color}',
          offset: '{focus.ring.offset}',
          shadow: '{focus.ring.shadow}',
        },
      },
    },
    stepper: {
      root: {
        transitionDuration: '{transition.duration}',
      },
      separator: {
        background: '{content.border.color}',
        activeBackground: '{primary.color}',
        margin: '0 0 0 1.375rem',
        size: '2px',
      },
      step: {
        padding: '0.375rem',
        gap: '0.875rem',
      },
      stepHeader: {
        padding: '0',
        borderRadius: '{content.border.radius}',
        focusRing: {
          width: '{focus.ring.width}',
          style: '{focus.ring.style}',
          color: '{focus.ring.color}',
          offset: '{focus.ring.offset}',
          shadow: '{focus.ring.shadow}',
        },
        gap: '0.5rem',
      },
      stepTitle: {
        color: '{text.muted.color}',
        activeColor: '{primary.color}',
        fontWeight: '500',
        fontSize: '{typography.font.size}',
      },
      stepNumber: {
        background: '{content.background}',
        activeBackground: '{content.background}',
        borderColor: '{content.border.color}',
        activeBorderColor: '{content.border.color}',
        color: '{text.muted.color}',
        activeColor: '{primary.color}',
        size: '2rem',
        fontSize: '1rem',
        fontWeight: '500',
        borderRadius: '50%',
        shadow: '0px 0.5px 0px 0px rgba(0, 0, 0, 0.06), 0px 1px 1px 0px rgba(0, 0, 0, 0.12)',
      },
      steppanels: {
        padding: '0.75rem 0.375rem 1rem 0.375rem',
      },
      steppanel: {
        background: '{content.background}',
        color: '{content.color}',
        padding: '0',
        indent: '0.875rem',
      },
    },
    steps: {
      root: {
        transitionDuration: '{transition.duration}',
      },
      separator: {
        background: '{content.border.color}',
      },
      itemLink: {
        borderRadius: '{content.border.radius}',
        focusRing: {
          width: '{focus.ring.width}',
          style: '{focus.ring.style}',
          color: '{focus.ring.color}',
          offset: '{focus.ring.offset}',
          shadow: '{focus.ring.shadow}',
        },
        gap: '0.5rem',
      },
      itemLabel: {
        color: '{text.muted.color}',
        activeColor: '{primary.color}',
        fontWeight: '500',
      },
      itemNumber: {
        background: '{content.background}',
        activeBackground: '{content.background}',
        borderColor: '{content.border.color}',
        activeBorderColor: '{content.border.color}',
        color: '{text.muted.color}',
        activeColor: '{primary.color}',
        size: '2rem',
        fontSize: '1.143rem',
        fontWeight: '500',
        borderRadius: '50%',
        shadow: '0px 0.5px 0px 0px rgba(0, 0, 0, 0.06), 0px 1px 1px 0px rgba(0, 0, 0, 0.12)',
      },
    },
    tabmenu: {
      root: {
        transitionDuration: '{transition.duration}',
      },
      tablist: {
        borderWidth: '0 0 1px 0',
        background: '{content.background}',
        borderColor: '{content.border.color}',
      },
      item: {
        background: 'transparent',
        hoverBackground: 'transparent',
        activeBackground: 'transparent',
        borderWidth: '0 0 1px 0',
        borderColor: '{content.border.color}',
        hoverBorderColor: '{content.border.color}',
        activeBorderColor: '{primary.color}',
        color: '{text.muted.color}',
        hoverColor: '{text.color}',
        activeColor: '{primary.color}',
        padding: '1rem 1.125rem',
        fontWeight: '600',
        margin: '0 0 -1px 0',
        gap: '0.5rem',
        focusRing: {
          width: '{focus.ring.width}',
          style: '{focus.ring.style}',
          color: '{focus.ring.color}',
          offset: '{focus.ring.offset}',
          shadow: '{focus.ring.shadow}',
        },
      },
      itemIcon: {
        color: '{text.muted.color}',
        hoverColor: '{text.color}',
        activeColor: '{primary.color}',
      },
      activeBar: {
        height: '1px',
        bottom: '-1px',
        background: '{primary.color}',
      },
    },
    tabs: {
      root: {
        transitionDuration: '{transition.duration}',
      },
      tablist: {
        borderWidth: '0 0 1px 0',
        background: '{content.background}',
        borderColor: '{content.border.color}',
      },
      tab: {
        background: 'transparent',
        hoverBackground: 'transparent',
        activeBackground: 'transparent',
        borderWidth: '0',
        borderColor: 'transparent',
        hoverBorderColor: 'transparent',
        activeBorderColor: 'transparent',
        color: '{text.muted.color}',
        hoverColor: '{text.color}',
        activeColor: '{primary.color}',
        padding: '0.875rem 1rem',
        fontWeight: '600',
        fontSize: '{typography.font.size}',
        margin: '0',
        gap: '0.5rem',
        focusRing: {
          width: '{focus.ring.width}',
          style: '{focus.ring.style}',
          color: '{focus.ring.color}',
          offset: '-1px',
          shadow: '{focus.ring.shadow}',
        },
      },
      tabpanel: {
        background: '{content.background}',
        color: '{content.color}',
        padding: '0.75rem 1rem 1rem 1rem',
        focusRing: {
          width: '{focus.ring.width}',
          style: '{focus.ring.style}',
          color: '{focus.ring.color}',
          offset: '{focus.ring.offset}',
          shadow: 'inset {focus.ring.shadow}',
        },
      },
      navButton: {
        background: '{content.background}',
        color: '{text.muted.color}',
        hoverColor: '{text.color}',
        width: '2.25rem',
        shadow:
          '0px 0px 10px 50px light-dark(rgba(255, 255, 255, 0.6), color-mix(in srgb, {content.background}, transparent 50%))',
        focusRing: {
          width: '{focus.ring.width}',
          style: '{focus.ring.style}',
          color: '{focus.ring.color}',
          offset: '-1px',
          shadow: '{focus.ring.shadow}',
        },
      },
      activeBar: {
        height: '1px',
        bottom: '0',
        background: '{primary.color}',
      },
    },
    tabview: {
      root: {
        transitionDuration: '{transition.duration}',
      },
      tabList: {
        background: '{content.background}',
        borderColor: '{content.border.color}',
      },
      tab: {
        borderColor: '{content.border.color}',
        activeBorderColor: '{primary.color}',
        color: '{text.muted.color}',
        hoverColor: '{text.color}',
        activeColor: '{primary.color}',
      },
      tabPanel: {
        background: '{content.background}',
        color: '{content.color}',
      },
      navButton: {
        background: '{content.background}',
        color: '{text.muted.color}',
        hoverColor: '{text.color}',
        shadow:
          '0px 0px 10px 50px light-dark(rgba(255, 255, 255, 0.6), color-mix(in srgb, {content.background}, transparent 50%))',
      },
    },
    tag: {
      root: {
        fontSize: '0.75rem',
        fontWeight: '700',
        padding: '0.125rem 0.375rem',
        gap: '0.25rem',
        borderRadius: '{content.border.radius}',
        roundedBorderRadius: '{border.radius.xl}',
      },
      icon: {
        size: '0.625rem',
      },
      primary: {
        background: 'light-dark({primary.100}, color-mix(in srgb, {primary.500}, transparent 84%))',
        color: 'light-dark({primary.700}, {primary.300})',
      },
      secondary: {
        background: 'light-dark({surface.100}, {surface.800})',
        color: 'light-dark({surface.600}, {surface.300})',
      },
      success: {
        background: 'light-dark({green.100}, color-mix(in srgb, {green.500}, transparent 84%))',
        color: 'light-dark({green.700}, {green.300})',
      },
      info: {
        background: 'light-dark({sky.100}, color-mix(in srgb, {sky.500}, transparent 84%))',
        color: 'light-dark({sky.700}, {sky.300})',
      },
      warn: {
        background: 'light-dark({orange.100}, color-mix(in srgb, {orange.500}, transparent 84%))',
        color: 'light-dark({orange.700}, {orange.300})',
      },
      danger: {
        background: 'light-dark({red.100}, color-mix(in srgb, {red.500}, transparent 84%))',
        color: 'light-dark({red.700}, {red.300})',
      },
      contrast: {
        background: 'light-dark({surface.950}, {surface.0})',
        color: 'light-dark({surface.0}, {surface.950})',
      },
    },
    terminal: {
      root: {
        background: '{form.field.background}',
        borderColor: '{form.field.border.color}',
        color: '{form.field.color}',
        height: '16rem',
        padding: '{form.field.padding.y} {form.field.padding.x}',
        borderRadius: '{form.field.border.radius}',
        fontWeight: '{typography.font.weight}',
        fontSize: '{typography.font.size}',
      },
      prompt: {
        gap: '0.25rem',
      },
      commandResponse: {
        margin: '2px 0',
      },
    },
    textarea: {
      root: {
        fontSize: '{form.field.font.size}',
        fontWeight: '{form.field.font.weight}',
        background: '{form.field.background}',
        disabledBackground: '{form.field.disabled.background}',
        filledBackground: '{form.field.filled.background}',
        filledHoverBackground: '{form.field.filled.hover.background}',
        filledFocusBackground: '{form.field.filled.focus.background}',
        borderColor: '{form.field.border.color}',
        hoverBorderColor: '{form.field.hover.border.color}',
        focusBorderColor: '{form.field.focus.border.color}',
        invalidBorderColor: '{form.field.invalid.border.color}',
        color: '{form.field.color}',
        disabledColor: '{form.field.disabled.color}',
        placeholderColor: '{form.field.placeholder.color}',
        invalidPlaceholderColor: '{form.field.invalid.placeholder.color}',
        shadow: '{form.field.shadow}',
        paddingX: '{form.field.padding.x}',
        paddingY: '{form.field.padding.y}',
        borderRadius: '{form.field.border.radius}',
        focusRing: {
          width: '{form.field.focus.ring.width}',
          style: '{form.field.focus.ring.style}',
          color: '{form.field.focus.ring.color}',
          offset: '{form.field.focus.ring.offset}',
          shadow: '{form.field.focus.ring.shadow}',
        },
        transitionDuration: '{form.field.transition.duration}',
        sm: {
          fontSize: '{form.field.sm.font.size}',
          paddingX: '{form.field.sm.padding.x}',
          paddingY: '{form.field.sm.padding.y}',
        },
        lg: {
          fontSize: '{form.field.lg.font.size}',
          paddingX: '{form.field.lg.padding.x}',
          paddingY: '{form.field.lg.padding.y}',
        },
      },
    },
    tieredmenu: {
      root: {
        background: '{content.background}',
        borderColor: '{content.border.color}',
        color: '{content.color}',
        borderRadius: '{content.border.radius}',
        shadow: '{overlay.navigation.shadow}',
        transitionDuration: '{navigation.item.transition.duration}',
      },
      list: {
        padding: '{navigation.list.padding}',
        gap: '{navigation.list.gap}',
      },
      item: {
        focusBackground: '{navigation.item.focus.background}',
        activeBackground: '{navigation.item.active.background}',
        color: '{navigation.item.color}',
        focusColor: '{navigation.item.focus.color}',
        activeColor: '{navigation.item.active.color}',
        padding: '{navigation.item.padding}',
        borderRadius: '{navigation.item.border.radius}',
        gap: '{navigation.item.gap}',
        icon: {
          color: '{navigation.item.icon.color}',
          focusColor: '{navigation.item.icon.focus.color}',
          activeColor: '{navigation.item.icon.active.color}',
          size: '{navigation.item.icon.size}',
        },
        label: {
          fontWeight: '{navigation.item.label.font.weight}',
          fontSize: '{navigation.item.label.font.size}',
        },
      },
      submenu: {
        mobileIndent: '0.875rem',
      },
      submenuIcon: {
        size: '{navigation.submenu.icon.size}',
        color: '{navigation.submenu.icon.color}',
        focusColor: '{navigation.submenu.icon.focus.color}',
        activeColor: '{navigation.submenu.icon.active.color}',
      },
      separator: {
        borderColor: '{content.border.color}',
      },
    },
    timeline: {
      event: {
        minHeight: '4.5rem',
      },
      horizontal: {
        eventContent: {
          padding: '0.875rem 0',
        },
      },
      vertical: {
        eventContent: {
          padding: '0 0.875rem',
        },
      },
      eventMarker: {
        size: '1rem',
        borderRadius: '50%',
        borderWidth: '2px',
        background: '{content.background}',
        borderColor: '{content.border.color}',
        content: {
          borderRadius: '50%',
          size: '0.375rem',
          background: '{primary.color}',
          insetShadow: '0px 0.5px 0px 0px rgba(0, 0, 0, 0.06), 0px 1px 1px 0px rgba(0, 0, 0, 0.12)',
        },
      },
      eventConnector: {
        color: '{content.border.color}',
        size: '2px',
      },
    },
    toast: {
      root: {
        width: '22rem',
        borderRadius: '{content.border.radius}',
        borderWidth: '1px',
        transitionDuration: '0.3s',
        blur: '10px',
        focusRing: {
          width: '{focus.ring.width}',
          style: '{focus.ring.style}',
          color: '{focus.ring.color}',
          offset: '{focus.ring.offset}',
          shadow: '{focus.ring.shadow}',
        },
      },
      icon: {
        size: '1rem',
        margin: '1px 0 0 0',
      },
      content: {
        padding: '{overlay.popover.padding}',
        gap: '0.5rem',
      },
      text: {
        gap: '0.25rem',
      },
      summary: {
        fontWeight: '500',
        fontSize: '{typography.font.size}',
      },
      detail: {
        fontWeight: '500',
        fontSize: '0.75rem',
      },
      closeButton: {
        width: '1.5rem',
        height: '1.5rem',
        borderRadius: '50%',
        focusRing: {
          width: '{focus.ring.width}',
          style: '{focus.ring.style}',
          offset: '{focus.ring.offset}',
        },
      },
      closeIcon: {
        size: '0.875rem',
      },
      normal: {
        background: '{content.background}',
        borderColor: '{content.border.color}',
        color: '{text.color}',
        detailColor: '{text.muted.color}',
        shadow: '{overlay.popover.shadow}',
        closeButton: {
          hoverBackground: '{content.hover.background}',
          focusRing: {
            color: '{focus.ring.color}',
            shadow: 'none',
          },
        },
      },
      info: {
        background:
          'light-dark(color-mix(in srgb, {blue.50}, transparent 5%), color-mix(in srgb, {blue.500}, transparent 84%))',
        borderColor: 'light-dark({blue.200}, color-mix(in srgb, {blue.700}, transparent 64%))',
        color: 'light-dark({blue.600}, {blue.500})',
        detailColor: 'light-dark({surface.700}, {surface.0})',
        shadow: '0px 4px 8px 0px color-mix(in srgb, {blue.500}, transparent 96%)',
        closeButton: {
          hoverBackground: 'light-dark({blue.100}, rgba(255, 255, 255, 0.05))',
          focusRing: {
            color: 'light-dark({blue.600}, {blue.500})',
            shadow: 'none',
          },
        },
      },
      success: {
        background:
          'light-dark(color-mix(in srgb, {green.50}, transparent 5%), color-mix(in srgb, {green.500}, transparent 84%))',
        borderColor: 'light-dark({green.200}, color-mix(in srgb, {green.700}, transparent 64%))',
        color: 'light-dark({green.600}, {green.500})',
        detailColor: 'light-dark({surface.700}, {surface.0})',
        shadow: '0px 4px 8px 0px color-mix(in srgb, {green.500}, transparent 96%)',
        closeButton: {
          hoverBackground: 'light-dark({green.100}, rgba(255, 255, 255, 0.05))',
          focusRing: {
            color: 'light-dark({green.600}, {green.500})',
            shadow: 'none',
          },
        },
      },
      warn: {
        background:
          'light-dark(color-mix(in srgb, {yellow.50}, transparent 5%), color-mix(in srgb, {yellow.500}, transparent 84%))',
        borderColor: 'light-dark({yellow.200}, color-mix(in srgb, {yellow.700}, transparent 64%))',
        color: 'light-dark({yellow.600}, {yellow.500})',
        detailColor: 'light-dark({surface.700}, {surface.0})',
        shadow: '0px 4px 8px 0px color-mix(in srgb, {yellow.500}, transparent 96%)',
        closeButton: {
          hoverBackground: 'light-dark({yellow.100}, rgba(255, 255, 255, 0.05))',
          focusRing: {
            color: 'light-dark({yellow.600}, {yellow.500})',
            shadow: 'none',
          },
        },
      },
      error: {
        background:
          'light-dark(color-mix(in srgb, {red.50}, transparent 5%), color-mix(in srgb, {red.500}, transparent 84%))',
        borderColor: 'light-dark({red.200}, color-mix(in srgb, {red.700}, transparent 64%))',
        color: 'light-dark({red.600}, {red.500})',
        detailColor: 'light-dark({surface.700}, {surface.0})',
        shadow: '0px 4px 8px 0px color-mix(in srgb, {red.500}, transparent 96%)',
        closeButton: {
          hoverBackground: 'light-dark({red.100}, rgba(255, 255, 255, 0.05))',
          focusRing: {
            color: 'light-dark({red.600}, {red.500})',
            shadow: 'none',
          },
        },
      },
      secondary: {
        background: 'light-dark({surface.100}, {surface.800})',
        borderColor: 'light-dark({surface.200}, {surface.700})',
        color: 'light-dark({surface.600}, {surface.300})',
        detailColor: 'light-dark({surface.700}, {surface.0})',
        shadow: '0px 4px 8px 0px color-mix(in srgb, {surface.500}, transparent 96%)',
        closeButton: {
          hoverBackground: 'light-dark({surface.200}, {surface.700})',
          focusRing: {
            color: 'light-dark({surface.600}, {surface.300})',
            shadow: 'none',
          },
        },
      },
      contrast: {
        background: 'light-dark({surface.900}, {surface.0})',
        borderColor: 'light-dark({surface.950}, {surface.100})',
        color: 'light-dark({surface.50}, {surface.950})',
        detailColor: 'light-dark({surface.0}, {surface.950})',
        shadow: '0px 4px 8px 0px color-mix(in srgb, {surface.950}, transparent 96%)',
        closeButton: {
          hoverBackground: 'light-dark({surface.800}, {surface.100})',
          focusRing: {
            color: 'light-dark({surface.50}, {surface.950})',
            shadow: 'none',
          },
        },
      },
    },
    togglebutton: {
      root: {
        padding: '0.25rem',
        borderRadius: '{content.border.radius}',
        gap: '0.5rem',
        fontWeight: '500',
        fontSize: '{form.field.font.size}',
        background: 'light-dark({surface.100}, {surface.950})',
        checkedBackground: 'light-dark({surface.100}, {surface.950})',
        hoverBackground: 'light-dark({surface.100}, {surface.950})',
        borderColor: 'light-dark({surface.100}, {surface.950})',
        color: 'light-dark({surface.500}, {surface.400})',
        hoverColor: 'light-dark({surface.700}, {surface.300})',
        checkedColor: 'light-dark({surface.900}, {surface.0})',
        checkedBorderColor: 'light-dark({surface.100}, {surface.950})',
        disabledBackground: '{form.field.disabled.background}',
        disabledBorderColor: '{form.field.disabled.background}',
        disabledColor: '{form.field.disabled.color}',
        invalidBorderColor: '{form.field.invalid.border.color}',
        focusRing: {
          width: '{focus.ring.width}',
          style: '{focus.ring.style}',
          color: '{focus.ring.color}',
          offset: '{focus.ring.offset}',
          shadow: '{focus.ring.shadow}',
        },
        transitionDuration: '{form.field.transition.duration}',
        sm: {
          fontSize: '{form.field.sm.font.size}',
          padding: '0.25rem',
        },
        lg: {
          fontSize: '{form.field.lg.font.size}',
          padding: '0.25rem',
        },
      },
      icon: {
        color: 'light-dark({surface.500}, {surface.400})',
        hoverColor: 'light-dark({surface.700}, {surface.300})',
        checkedColor: 'light-dark({surface.900}, {surface.0})',
        disabledColor: '{form.field.disabled.color}',
      },
      content: {
        padding: '0.125rem 0.625rem',
        borderRadius: '{content.border.radius}',
        checkedBackground: 'light-dark({surface.0}, {surface.800})',
        checkedShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.02), 0px 1px 2px 0px rgba(0, 0, 0, 0.04)',
        sm: {
          padding: '0.125rem 0.625rem',
        },
        lg: {
          padding: '0.125rem 0.625rem',
        },
      },
    },
    toggleswitch: {
      root: {
        width: '2.25rem',
        height: '1.375rem',
        borderRadius: '30px',
        gap: '0.25rem',
        shadow: '{form.field.shadow}',
        focusRing: {
          width: '{focus.ring.width}',
          style: '{focus.ring.style}',
          color: '{focus.ring.color}',
          offset: '{focus.ring.offset}',
          shadow: '{focus.ring.shadow}',
        },
        borderWidth: '1px',
        borderColor: 'transparent',
        hoverBorderColor: 'transparent',
        checkedBorderColor: 'transparent',
        checkedHoverBorderColor: 'transparent',
        invalidBorderColor: '{form.field.invalid.border.color}',
        transitionDuration: '{form.field.transition.duration}',
        slideDuration: '0.2s',
        background: 'light-dark({surface.300}, {surface.700})',
        disabledBackground: 'light-dark({form.field.disabled.background}, {surface.600})',
        hoverBackground: 'light-dark({surface.400}, {surface.600})',
        checkedBackground: '{primary.color}',
        checkedHoverBackground: '{primary.hover.color}',
      },
      handle: {
        borderRadius: '50%',
        size: '0.875rem',
        background: 'light-dark({surface.0}, {surface.400})',
        disabledBackground: 'light-dark({form.field.disabled.color}, {surface.900})',
        hoverBackground: 'light-dark({surface.0}, {surface.300})',
        checkedBackground: 'light-dark({surface.0}, {surface.900})',
        checkedHoverBackground: 'light-dark({surface.0}, {surface.900})',
        color: 'light-dark({text.muted.color}, {surface.900})',
        hoverColor: 'light-dark({text.color}, {surface.800})',
        checkedColor: '{primary.color}',
        checkedHoverColor: '{primary.hover.color}',
      },
    },
    toolbar: {
      root: {
        background: '{content.background}',
        borderColor: '{content.border.color}',
        borderRadius: '{content.border.radius}',
        color: '{content.color}',
        gap: '0.5rem',
        padding: '0.625rem',
      },
    },
    tooltip: {
      root: {
        maxWidth: '12.5rem',
        gutter: '0.25rem',
        shadow: '{overlay.popover.shadow}',
        padding: '0.375rem 0.625rem',
        borderRadius: '{overlay.popover.border.radius}',
        fontWeight: '{typography.font.weight}',
        fontSize: '0.75rem',
        background: '{surface.700}',
        color: '{surface.0}',
      },
    },
    tree: {
      root: {
        background: '{content.background}',
        color: '{content.color}',
        padding: '0.875rem',
        gap: '2px',
        indent: '0.875rem',
        transitionDuration: '0s',
      },
      node: {
        padding: '0.25rem 0.5rem',
        borderRadius: '{content.border.radius}',
        hoverBackground: '{content.hover.background}',
        selectedBackground: '{highlight.background}',
        color: '{text.color}',
        hoverColor: '{text.hover.color}',
        selectedColor: '{highlight.color}',
        focusRing: {
          width: '{focus.ring.width}',
          style: '{focus.ring.style}',
          color: '{focus.ring.color}',
          offset: '-1px',
          shadow: '{focus.ring.shadow}',
        },
        gap: '0.375rem',
      },
      nodeIcon: {
        color: '{text.muted.color}',
        hoverColor: '{text.hover.muted.color}',
        selectedColor: '{highlight.color}',
      },
      nodeLabel: {
        fontWeight: '{typography.font.weight}',
        selectedFontWeight: '{list.option.selected.font.weight}',
        fontSize: '{typography.font.size}',
      },
      nodeToggleButton: {
        borderRadius: '50%',
        size: '1.5rem',
        hoverBackground: '{content.hover.background}',
        selectedHoverBackground: '{content.background}',
        color: '{text.muted.color}',
        hoverColor: '{text.hover.muted.color}',
        selectedHoverColor: '{primary.color}',
        focusRing: {
          width: '{focus.ring.width}',
          style: '{focus.ring.style}',
          color: '{focus.ring.color}',
          offset: '{focus.ring.offset}',
          shadow: '{focus.ring.shadow}',
        },
      },
      loadingIcon: {
        size: '1.75rem',
      },
      filter: {
        margin: '0 0 0.5rem 0',
      },
      css: '\n    .p-tree-mask.p-overlay-mask {\n        --px-mask-background: light-dark(rgba(255,255,255,0.5),rgba(0,0,0,0.3));\n    }\n',
    },
    treeselect: {
      root: {
        fontSize: '{form.field.font.size}',
        fontWeight: '{form.field.font.weight}',
        background: '{form.field.background}',
        disabledBackground: '{form.field.disabled.background}',
        filledBackground: '{form.field.filled.background}',
        filledHoverBackground: '{form.field.filled.hover.background}',
        filledFocusBackground: '{form.field.filled.focus.background}',
        borderColor: '{form.field.border.color}',
        hoverBorderColor: '{form.field.hover.border.color}',
        focusBorderColor: '{form.field.focus.border.color}',
        invalidBorderColor: '{form.field.invalid.border.color}',
        color: '{form.field.color}',
        disabledColor: '{form.field.disabled.color}',
        placeholderColor: '{form.field.placeholder.color}',
        invalidPlaceholderColor: '{form.field.invalid.placeholder.color}',
        shadow: '{form.field.shadow}',
        paddingX: '{form.field.padding.x}',
        paddingY: '{form.field.padding.y}',
        borderRadius: '{form.field.border.radius}',
        focusRing: {
          width: '{form.field.focus.ring.width}',
          style: '{form.field.focus.ring.style}',
          color: '{form.field.focus.ring.color}',
          offset: '{form.field.focus.ring.offset}',
          shadow: '{form.field.focus.ring.shadow}',
        },
        transitionDuration: '{form.field.transition.duration}',
        sm: {
          fontSize: '{form.field.sm.font.size}',
          paddingX: '{form.field.sm.padding.x}',
          paddingY: '{form.field.sm.padding.y}',
        },
        lg: {
          fontSize: '{form.field.lg.font.size}',
          paddingX: '{form.field.lg.padding.x}',
          paddingY: '{form.field.lg.padding.y}',
        },
      },
      dropdown: {
        width: '2.25rem',
        color: '{form.field.icon.color}',
      },
      overlay: {
        background: '{overlay.select.background}',
        borderColor: '{overlay.select.border.color}',
        borderRadius: '{overlay.select.border.radius}',
        color: '{overlay.select.color}',
        shadow: '{overlay.select.shadow}',
      },
      tree: {
        padding: '{list.padding}',
      },
      emptyMessage: {
        padding: '{list.option.padding}',
      },
      chip: {
        borderRadius: '{border.radius.sm}',
      },
      clearIcon: {
        color: '{form.field.icon.color}',
      },
    },
    treetable: {
      root: {
        transitionDuration: '0s',
        borderColor: 'light-dark({content.border.color}, {surface.800})',
      },
      header: {
        background: '{content.background}',
        borderColor: '{treetable.border.color}',
        color: '{content.color}',
        borderWidth: '0 0 1px 0',
        padding: '0.5rem 0.875rem',
      },
      headerCell: {
        background: '{content.background}',
        hoverBackground: '{content.hover.background}',
        selectedBackground: '{highlight.background}',
        borderColor: '{treetable.border.color}',
        color: '{content.color}',
        hoverColor: '{content.hover.color}',
        selectedColor: '{highlight.color}',
        gap: '0.5rem',
        padding: '0.5rem 0.875rem',
        focusRing: {
          width: '{focus.ring.width}',
          style: '{focus.ring.style}',
          color: '{focus.ring.color}',
          offset: '-1px',
          shadow: '{focus.ring.shadow}',
        },
      },
      columnTitle: {
        fontWeight: '600',
        fontSize: '{typography.font.size}',
      },
      row: {
        background: '{content.background}',
        hoverBackground: '{content.hover.background}',
        selectedBackground: '{highlight.background}',
        color: '{content.color}',
        hoverColor: '{content.hover.color}',
        selectedColor: '{highlight.color}',
        focusRing: {
          width: '{focus.ring.width}',
          style: '{focus.ring.style}',
          color: '{focus.ring.color}',
          offset: '-1px',
          shadow: '{focus.ring.shadow}',
        },
      },
      bodyCell: {
        borderColor: '{treetable.border.color}',
        padding: '0.5rem 0.875rem',
        gap: '0.5rem',
        fontWeight: '{typography.font.size}',
        fontSize: '{typography.font.size}',
        selectedBorderColor: 'light-dark({primary.100}, {primary.900})',
      },
      footerCell: {
        background: '{content.background}',
        borderColor: '{treetable.border.color}',
        color: '{content.color}',
        padding: '0.5rem 0.875rem',
      },
      columnFooter: {
        fontWeight: '600',
        fontSize: '{typography.font.size}',
      },
      footer: {
        background: '{content.background}',
        borderColor: '{treetable.border.color}',
        color: '{content.color}',
        borderWidth: '0 0 1px 0',
        padding: '0.5rem 0.875rem',
      },
      columnResizer: {
        width: '0.5rem',
      },
      resizeIndicator: {
        width: '1px',
        color: '{primary.color}',
      },
      sortIcon: {
        color: '{text.muted.color}',
        hoverColor: '{text.hover.muted.color}',
        size: '0.75rem',
      },
      loadingIcon: {
        size: '1.75rem',
      },
      nodeToggleButton: {
        hoverBackground: '{content.hover.background}',
        selectedHoverBackground: '{content.background}',
        color: '{text.muted.color}',
        hoverColor: '{text.color}',
        selectedHoverColor: '{primary.color}',
        size: '1.5rem',
        borderRadius: '50%',
        focusRing: {
          width: '{focus.ring.width}',
          style: '{focus.ring.style}',
          color: '{focus.ring.color}',
          offset: '{focus.ring.offset}',
          shadow: '{focus.ring.shadow}',
        },
      },
      paginatorTop: {
        borderColor: '{content.border.color}',
        borderWidth: '0 0 1px 0',
      },
      paginatorBottom: {
        borderColor: '{content.border.color}',
        borderWidth: '0 0 1px 0',
      },
      css: '\n    .p-treetable-mask.p-overlay-mask {\n        --px-mask-background: light-dark(rgba(255,255,255,0.5),rgba(0,0,0,0.3));\n    }\n',
    },
    virtualscroller: {
      loader: {
        mask: {
          background: '{content.background}',
          color: '{text.muted.color}',
        },
        icon: {
          size: '1.75rem',
        },
      },
    },
  },
  // Tokens de marque About Us hors du vocabulaire PrimeNG : variables --p-au-*.
  extend: {
    au: {
      fontSans: "'DM Sans', system-ui, -apple-system, 'Segoe UI', sans-serif",
      fontMono: "'DM Mono', ui-monospace, Menlo, monospace",
      // Orange du « U » du logo : remplissage uniquement (texte posé dessus en surface.900).
      accent: '#fc4a2c',
      accentInk: '#c2361a',
      accentSoft: '#ffede6',
      success: '#137a55',
      successSoft: '#e3f6ee',
      warning: '#9a5200',
      warningSoft: '#fff2dc',
      danger: '#c1271d',
      dangerSoft: '#fde9e7',
      // Fond du shell : halo bleu sourd centré en haut, qui tend vers le noir.
      shellGradient:
        'radial-gradient(ellipse 55% 240px at 50% 0%, #1e4bb0 0%, #143a8f 24%, #0c2563 50%, #061338 74%, #000000 100%)',
      floatShadow: '0 8px 24px rgba(16, 24, 48, 0.12)',
    },
  },
  // Styles de mise en page qui n'ont pas d'équivalent en token (voir DESIGN.md).
  // Les variables --p-* sont générées par PrimeNG à partir des tokens ci-dessus.
  css: `
html, body {
  margin: 0;
  font-family: var(--p-au-font-sans);
  font-size: 1rem;
  color: var(--p-text-color);
  background: var(--au-bg);
}
code, pre, kbd { font-family: var(--p-au-font-mono); }

/* ---------- Rôles de couleur : un thème clair et un thème sombre, chacun conçu pour lui-même ---------- */
/* Les classes .au-* lisent ces rôles, jamais un gris numéroté. Le thème clair reprend la charte d'origine. */
:root {
  --au-bg: var(--p-surface-50);            /* fond de page */
  --au-panel: var(--p-surface-100);        /* barres latérales, pistes de filtres */
  --au-panel-hover: var(--p-surface-200);  /* survol dans une barre latérale */
  --au-card: var(--p-surface-0);           /* cartes, en-têtes de liste, champs maison */
  --au-active: var(--p-surface-0);         /* élément actif (navigation, pilule choisie) */
  --au-hover: var(--p-surface-100);        /* survol dans une carte */
  --au-subtle: var(--p-surface-50);        /* fonds discrets : pieds de carte, rayures, panneau de détail */
  --au-border-strong: var(--p-surface-300);
  --au-border-hover: var(--p-surface-400);
  --au-text-head: var(--p-surface-700);    /* en-têtes de tableau */
  --au-on-color: #ffffff;                  /* texte et icônes posés sur une couleur (bandeau, bleu, rouge) */
}

/* ---------- Thème sombre (classe au-dark sur <html>, posée par ThemeService) ---------- */
/* Conçu à part : noirs graphite à peine froids, élévation par la lumière (plus on monte, plus c'est clair),
   filets discrets, couleurs d'état désaturées. color-scheme: dark active les valeurs sombres des tokens
   PrimeNG (light-dark) et les contrôles natifs ; la palette zinc ci-dessous leur donne nos propres noirs. */
:root.au-dark {
  color-scheme: dark;
  --p-zinc-950: #0b0c10;
  --p-zinc-900: #14161c;
  --p-zinc-800: #1c1f26;
  --p-zinc-700: #282b34;
  --p-zinc-600: #383c47;
  --p-zinc-500: #5c6271;
  --p-zinc-400: #9aa0ad;
  --p-zinc-300: #c3c7cf;
  --p-zinc-200: #dcdfe4;
  --p-zinc-100: #eceef1;
  --p-zinc-50: #f6f7f9;
  --au-bg: #0b0c10;
  --au-panel: #0f1115;
  --au-panel-hover: #191b21;
  --au-card: #14161c;
  --au-active: #22252d;
  --au-hover: #1c1f26;
  --au-subtle: #111318;
  --au-border-strong: #383c47;
  --au-border-hover: #4d5260;
  --au-text-head: #c3c7cf;
  --p-au-success: #4cc38a;
  --p-au-success-soft: rgba(76, 195, 138, 0.12);
  --p-au-warning: #e5a53a;
  --p-au-warning-soft: rgba(229, 165, 58, 0.12);
  --p-au-danger: #ec6a62;
  --p-au-danger-soft: rgba(236, 106, 98, 0.12);
  --p-au-accent-soft: rgba(252, 74, 44, 0.14);
}
:root.au-dark ::selection { background: rgba(77, 132, 245, 0.35); color: #fff; }
/* Ombres des éléments flottants : plus profondes et plus noires sur fond sombre. */
:root.au-dark .p-menu, :root.au-dark .p-dialog, :root.au-dark .p-select-overlay, :root.au-dark .au-toast .p-toast-message { box-shadow: 0 1px 0 rgba(255, 255, 255, 0.04) inset, 0 18px 44px -12px rgba(0, 0, 0, 0.75); }
/* Pilule choisie : un filet clair remplace l'ombre portée, invisible sur fond sombre. */
:root.au-dark .au-filter.p-selectbutton .p-togglebutton-checked .p-togglebutton-content { box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.06); }

/* ---------- Cartes : bordure, jamais d'ombre ---------- */
.p-card { border: 1px solid var(--p-content-border-color); }
.p-card.au-flush .p-card-body { padding: 0; gap: 0; }
.p-card.au-flush { overflow: hidden; }

/* ---------- Shell ---------- */
.au-layout {
  display: flex; flex-direction: column; height: 100dvh; overflow: hidden;
  background-color: #000; background-image: var(--p-au-shell-gradient); background-repeat: no-repeat;
}
.au-topbar {
  flex-shrink: 0; display: flex; align-items: center; gap: 0.75rem; height: 52px; padding: 0 0.75rem;
  color: var(--au-on-color);
}
.au-topbar .p-button-text.p-button-secondary { color: var(--au-on-color); }
.au-topbar .p-button-text.p-button-secondary:not(:disabled):hover { background: rgba(255, 255, 255, 0.1); }
.au-topbar-name { font-size: 16px; font-weight: 600; letter-spacing: -0.01em; }
.au-topbar-logout { margin-left: auto; }
/* Profil dans la barre du haut : bouton rond (icône personne, filet clair), ouvre un menu façon Hostinger. */
.au-topbar-profile { display: grid; place-items: center; width: 2.25rem; height: 2.25rem; margin-left: auto; padding: 0; border: 1px solid rgba(255, 255, 255, 0.35); border-radius: 999px; background: transparent; color: var(--au-on-color); cursor: pointer; transition: background 150ms; }
.au-topbar-profile:hover, .au-topbar-profile[aria-expanded='true'] { background: rgba(255, 255, 255, 0.12); }
.au-topbar-profile:focus-visible { outline: 2px solid var(--au-on-color); outline-offset: 2px; }
.au-topbar-profile .pi { font-size: 1rem; }
/* Le menu suit les tokens de tous les menus (arrondi lg 12px, entrées 4 × 10px, écart 8px) ;
   seul l'en-tête est propre : son texte s'aligne sur celui des entrées (4px de liste + 10px d'entrée). */
.au-profile-menu.p-menu { min-width: 16rem; border-radius: var(--p-border-radius-lg); }
.au-profile-menu-head { padding: 0.75rem 0.875rem; border-bottom: 1px solid var(--p-content-border-color); }
.au-profile-menu-name { font-weight: 600; color: var(--p-text-color); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.au-profile-menu-section { display: grid; gap: 0.5rem; margin-top: 0.25rem; padding: 0.75rem 0.875rem; border-top: 1px solid var(--p-content-border-color); }
.au-profile-menu-label { font-size: 0.875rem; font-weight: 500; color: var(--p-text-color); }
.au-theme-switch.p-selectbutton { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); }
.au-theme-switch.p-selectbutton .p-togglebutton-content { justify-content: center; height: 30px; padding: 0 0.5rem; font-size: 0.875rem; }
/* « Se déconnecter » : même gabarit qu'une entrée de menu (4 × 10px de marge, écart 8px), sous un filet. */
.au-profile-menu-action { display: flex; align-items: center; gap: 0.5rem; width: calc(100% - 0.5rem); margin: 0 0.25rem 0.25rem; padding: 0.25rem 0.625rem; min-height: 2.25rem; border: 0; border-top: 1px solid var(--p-content-border-color); border-radius: 0; background: transparent; font: inherit; color: var(--p-text-color); text-align: left; cursor: pointer; }
.au-profile-menu-action:hover { border-radius: var(--p-border-radius-sm); background: var(--au-hover); }
.au-profile-menu-action:focus-visible { outline: 2px solid var(--p-primary-color); outline-offset: -2px; }
.au-profile-menu-action .pi { color: var(--p-text-muted-color); }
.au-profile-menu-email { margin-top: 0.125rem; font-size: 0.8125rem; color: var(--p-text-muted-color); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
/* Titre de section en tête d'une barre dédiée (paramètres du compte). */
.au-subnav-title { margin: 0.25rem 0 0.5rem; padding: 0 0.75rem; font-size: 0.8125rem; font-weight: 600; color: var(--p-text-muted-color); }
/* Formulaire de mot de passe dans une carte de paramètres : champs empilés (26rem max), actions en pied. */
.au-password-form { display: grid; gap: 1.25rem; }
.au-password-form > div:not(.au-password-form-actions) { max-width: 26rem; }
.au-password-form .p-password, .au-password-form .p-inputtext { width: 100%; }
.au-password-form-actions { display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap; padding-top: 1.25rem; border-top: 1px solid var(--p-content-border-color); }
/* Session ouverte (façon GitHub) : icône grise, nom, « Cet appareil » à pastille verte, activité relative ; action texte à droite. */
.au-session { display: flex; align-items: center; gap: 1rem; padding-top: 0.875rem; padding-bottom: 0.875rem; border-bottom: 1px solid var(--p-content-border-color); }
.au-session:last-child { border-bottom: 0; }
.au-session-icon { flex: none; width: 1.25rem; font-size: 1.125rem; text-align: center; color: var(--p-text-muted-color); }
.au-session-name { display: flex; align-items: center; gap: 0.625rem; min-width: 0; margin: 0; font-weight: 500; color: var(--p-text-color); }
.au-session-current { display: inline-flex; flex: none; align-items: center; gap: 0.375rem; font-size: 0.8125rem; font-weight: 500; color: var(--p-au-success); }
.au-session-current > span { width: 0.4375rem; height: 0.4375rem; border-radius: 999px; background: var(--p-au-success); }
.au-session-meta { margin: 0.125rem 0 0; font-size: 0.875rem; color: var(--p-text-muted-color); }
.au-password-preview { flex: 1; min-width: 0; border: 0; background: transparent; font: inherit; letter-spacing: 0.15em; color: var(--p-text-color); outline: 0; }
.au-topbar-brand { display: inline-flex; align-items: center; gap: 0.75rem; color: inherit; text-decoration: none; border-radius: var(--p-border-radius-md); }
.au-topbar-brand:focus-visible { outline: 2px solid var(--au-on-color); outline-offset: 2px; }
.au-topbar-logo { display: grid; place-items: center; width: 32px; height: 32px; border-radius: var(--p-border-radius-md); background: var(--au-on-color); }
.au-topbar-pill {
  display: inline-flex; align-items: center; height: 28px; padding: 0 0.75rem; border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.28); background: rgba(255, 255, 255, 0.08); font-size: 12px; font-weight: 600;
}
@media (max-width: 640px) { .au-topbar-pill { display: none; } }
.au-shell { flex: 1; min-height: 0; display: flex; margin: 0 0.5rem 0.5rem; border-radius: var(--p-border-radius-xl); overflow: hidden; background: var(--au-bg); }
.au-shell p-sidebar-layout { position: relative; flex: 1; min-height: 0; overflow: hidden; }
.au-shell p-sidebar-main { display: flex; flex-direction: column; min-height: 0; min-width: 0; background: var(--au-bg); }
.au-content { display: flex; flex-direction: column; flex: 1; min-height: 0; overflow: auto; padding: 2rem clamp(1rem, 3vw, 2rem); }
.au-content > :not(router-outlet) { display: block; width: 100%; max-width: 1110px; margin-inline: auto; }
.au-content.is-flush { padding: 0; overflow: hidden; }
.au-content.is-flush > :not(router-outlet) { max-width: none; flex: 1; min-height: 0; }

/* ---------- Navigation principale ---------- */
.au-shell [pSidebarMenuButton] { font-weight: 500; color: var(--p-text-color); }
.au-nav-away { margin-left: auto; font-size: 0.7rem; color: var(--p-text-muted-color); }
.au-shell p-sidebar[data-collapsible='icon'] .au-nav-away { display: none; }
.au-shell [pSidebarMenuButton]:hover { background: var(--au-panel-hover); }
/* Actif : uniquement un fond différent de la barre (blanc), sans bordure. */
.au-shell [pSidebarMenuButton].active-link,
.au-shell [pSidebarMenuButton].active-link:hover { background: var(--au-active); color: var(--p-text-color); }
/* Icônes : même taille dépliée et réduite. */
.au-shell [pSidebarMenuButton] svg { width: 18px; height: 18px; flex: none; color: var(--p-text-muted-color); }
.au-shell [pSidebarMenuButton].active-link svg { color: var(--p-primary-color); }
.au-collapse { width: 100%; border: 0; background: transparent; font: inherit; font-size: 16px; font-weight: 500; color: var(--p-text-muted-color); cursor: pointer; }
/* Rail (barre réduite) : icônes seules, centrées. */
.au-shell p-sidebar[data-collapsible='icon'] [pSidebarMenuButton] { justify-content: center; width: 40px; height: 40px; margin-inline: auto; padding: 0; }
.au-shell p-sidebar[data-collapsible='icon'] [pSidebarMenuButton] > span { display: none; }
.au-shell p-sidebar[data-collapsible='icon'] p-sidebar-group-label { height: 0.5rem; overflow: hidden; }

/* ---------- Barre latérale de l'espace d'une école ---------- */
/* Remplace la navigation principale dans l'espace d'une école : même apparence qu'elle. */
.au-subnav { display: flex; flex-direction: column; gap: 0.5rem; padding: 1rem 0.75rem; overflow-y: auto; background: var(--au-panel); border-right: 1px solid var(--p-content-border-color); }
.au-subnav-tab { display: flex; align-items: center; gap: 0.75rem; height: 40px; padding: 0 0.75rem; border-radius: var(--p-border-radius-md); color: var(--p-text-color); font-size: 16px; font-weight: 500; text-decoration: none; }
.au-subnav-tab i { width: 18px; font-size: 16px; text-align: center; color: var(--p-text-muted-color); }
.au-subnav-tab:hover { background: var(--au-panel-hover); }
.au-subnav-tab:focus-visible { outline: 2px solid var(--p-primary-color); outline-offset: 2px; }
.au-subnav-tab.is-active { background: var(--au-active); }
.au-subnav-tab.is-active i { color: var(--p-primary-color); }
.au-subnav-tab svg { width: 18px; height: 18px; flex: none; color: var(--p-text-muted-color); }
.au-subnav-school { width: 2.25rem; height: 2.25rem; border-radius: var(--p-border-radius-md); font-weight: 600; }
/* Barre réduite : icônes seules, centrées (4rem, comme la navigation principale). */
/* Même animation que la navigation principale (PrimeNG Sidebar : largeur sur 250ms). */
.au-workspace { grid-template-columns: minmax(0, 1fr); grid-template-rows: auto minmax(0, 1fr); }
@media (min-width: 900px) {
  .au-workspace { grid-template-columns: 248px minmax(0, 1fr); grid-template-rows: minmax(0, 1fr); transition: grid-template-columns 250ms cubic-bezier(.4, 0, .2, 1); }
  .au-workspace.is-collapsed { grid-template-columns: 4rem minmax(0, 1fr); }
}
.au-subnav { overflow-x: hidden; transition: padding 250ms cubic-bezier(.4, 0, .2, 1); }
.au-subnav-tab { white-space: nowrap; transition: padding 250ms cubic-bezier(.4, 0, .2, 1), background 150ms; }
.au-subnav-tab span { min-width: 0; overflow: hidden; text-overflow: ellipsis; transition: opacity 150ms cubic-bezier(.4, 0, .2, 1); }
.au-subnav.is-collapsed { padding: 1rem 0.5rem; align-items: stretch; }
.au-subnav.is-collapsed > a[pButton] { align-self: center; }
/* L'icône reste centrée dans les 3rem utiles ; le libellé s'efface sans sauter. */
.au-subnav.is-collapsed .au-subnav-tab { padding: 0 calc((3rem - 18px) / 2); gap: 0; }
.au-subnav.is-collapsed .au-subnav-tab span { opacity: 0; width: 0; }
.au-subnav-school { animation: au-fade-in 250ms cubic-bezier(.4, 0, .2, 1); }
@keyframes au-fade-in { from { opacity: 0; } to { opacity: 1; } }
@media (prefers-reduced-motion: reduce) {
  .au-workspace, .au-subnav, .au-subnav-tab, .au-subnav-tab span { transition: none; }
  .au-subnav-school { animation: none; }
}
/* Sur mobile la barre passe au-dessus du contenu : pas de mode réduit. */
@media (max-width: 899px) { .au-subnav .au-collapse { display: none; } }

/* ---------- Journaux d'événements (console de logs, pleine largeur) ---------- */
/* Filtres à gauche (groupes repliables), barre de recherche + Live en haut, liste dense et alignée. */
.au-logs { display: grid; grid-template-columns: 16rem minmax(0, 1fr); flex: 1; min-height: 0; background: var(--au-card); }
.au-logs-mono { font-family: var(--p-au-font-mono); font-size: 1rem; font-variant-numeric: tabular-nums; }
.au-logs-filters { display: flex; flex-direction: column; gap: 0.25rem; min-height: 0; overflow-y: auto; padding: 1rem 0.75rem; border-right: 1px solid var(--p-content-border-color); background: var(--au-panel); }
.au-logs-filters-head { display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; padding: 0 0.25rem 0.75rem; }
.au-logs-title { margin: 0; font-size: 1rem; font-weight: 600; color: var(--p-text-color); }
.au-logs-group { padding: 0.25rem 0; border-top: 1px solid var(--p-content-border-color); }
.au-logs-group-toggle { display: flex; align-items: center; gap: 0.5rem; width: 100%; height: 2.25rem; padding: 0 0.25rem; border: 0; border-radius: var(--p-border-radius-md); background: transparent; font: inherit; font-size: 1rem; font-weight: 600; color: var(--p-text-color); cursor: pointer; }
.au-logs-group-toggle i { font-size: 0.7rem; color: var(--p-text-muted-color); transition: transform 150ms; }
.au-logs-group-toggle[aria-expanded='false'] i { transform: rotate(-90deg); }
.au-logs-group-toggle:focus-visible, .au-logs-option:focus-visible, .au-logs-live:focus-visible { outline: 2px solid var(--p-primary-color); outline-offset: 1px; }
.au-logs-options { display: grid; gap: 1px; margin: 0 0 0.5rem; padding: 0; list-style: none; }
.au-logs-option { display: flex; align-items: center; gap: 0.625rem; width: 100%; height: 2rem; padding: 0 0.5rem; border: 0; border-radius: var(--p-border-radius-md); background: transparent; font: inherit; font-size: 1rem; color: var(--p-text-color); text-align: left; cursor: pointer; }
.au-logs-option:hover { background: var(--au-panel-hover); }
.au-logs-option-key { margin-left: auto; font-size: 0.6875rem; color: var(--p-text-muted-color); }
.au-logs-check { display: grid; place-items: center; width: 1rem; height: 1rem; flex: none; border: 1px solid var(--au-border-strong); border-radius: 4px; background: var(--au-card); }
.au-logs-check i { font-size: 0.55rem; color: var(--au-on-color); opacity: 0; }
.au-logs-option.is-selected .au-logs-check { border-color: var(--p-primary-color); background: var(--p-primary-color); }
.au-logs-option.is-selected .au-logs-check i { opacity: 1; }
.au-logs-scope { display: grid; gap: 0.375rem; padding: 0.75rem 0.25rem; border-top: 1px solid var(--p-content-border-color); font-size: 1rem; color: var(--p-text-color); }
.au-logs-scope-label { color: var(--p-text-muted-color); }
.au-logs-scope-id { overflow-wrap: anywhere; color: var(--p-text-muted-color); }
.au-logs-link { margin-top: 0.5rem; color: var(--p-primary-color); text-decoration: none; }
.au-logs-link:hover { text-decoration: underline; text-underline-offset: 3px; }
.au-logs-main { display: flex; flex-direction: column; min-width: 0; min-height: 0; }
.au-logs-bar { display: flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1rem; border-bottom: 1px solid var(--p-content-border-color); }
.au-logs-bar .p-inputtext { height: 2.5rem; }
.au-logs-live { display: inline-flex; align-items: center; gap: 0.5rem; height: 2.5rem; padding: 0 0.875rem; border: 1px solid var(--p-content-border-color); border-radius: var(--p-border-radius-md); background: var(--au-card); font: inherit; font-size: 1rem; font-weight: 500; color: var(--p-text-color); cursor: pointer; }
.au-logs-live:hover { background: var(--au-hover); }
.au-logs-live-dot { width: 0.5rem; height: 0.5rem; border-radius: 999px; background: var(--au-border-strong); }
.au-logs-live.is-on .au-logs-live-dot { background: var(--p-au-success); box-shadow: 0 0 0 0 color-mix(in srgb, var(--p-au-success) 50%, transparent); animation: au-live 1.6s ease-out infinite; }
@keyframes au-live { to { box-shadow: 0 0 0 6px transparent; } }
@media (prefers-reduced-motion: reduce) { .au-logs-live.is-on .au-logs-live-dot { animation: none; } }
.au-logs-body { display: grid; grid-template-columns: minmax(0, 1fr); flex: 1; min-height: 0; }
.au-logs-body.has-detail { grid-template-columns: minmax(0, 1fr) minmax(22rem, 26rem); }
.au-logs-list { display: flex; flex-direction: column; min-width: 0; min-height: 0; }
.au-logs-scroll { flex: 1; min-height: 0; padding: 0.25rem 0.75rem 0; overflow: auto; scrollbar-width: thin; scrollbar-color: var(--au-border-strong) transparent; }
/* Lignes fines (32px), alternées, en-tête collant. Préfixe .au-logs : passe avant la hauteur globale des tableaux (64px). */
.au-logs .au-logs-table .p-datatable-thead > tr > th { position: sticky; top: 0; z-index: 1; height: 2.25rem; padding: 0 1rem; background: var(--au-card); border-bottom: 1px solid var(--p-content-border-color); font-size: 1rem; font-weight: 500; color: var(--p-text-muted-color); }
.au-logs .au-logs-table .p-datatable-tbody > tr { cursor: pointer; }
.au-logs .au-logs-table .p-datatable-tbody > tr > td { height: 2rem; padding: 0 1rem; border: 0; font-size: 1rem; line-height: 2rem; white-space: nowrap; }
.au-logs .au-logs-table .p-datatable-tbody > tr:nth-child(even) > td { background: var(--au-subtle); }
.au-logs .au-logs-table .p-datatable-tbody > tr:hover > td { background: var(--au-hover); }
.au-logs .au-logs-table .p-datatable-tbody > tr.is-selected > td { background: color-mix(in srgb, var(--p-primary-color) 10%, var(--au-card)); }
.au-logs .au-logs-table .p-datatable-tbody > tr > td:first-child { border-radius: 6px 0 0 6px; }
.au-logs .au-logs-table .p-datatable-tbody > tr > td:last-child { border-radius: 0 6px 6px 0; }
/* Panneau de détail : en-tête (type, nom, ↑ ↓, copier, fermer), date, propriétés, données. */
.au-logs-detail { display: flex; flex-direction: column; min-height: 0; border-left: 1px solid var(--p-content-border-color); background: var(--au-subtle); }
.au-logs-detail-head { display: flex; align-items: center; gap: 0.25rem; padding: 0.5rem 0.5rem 0.5rem 1rem; border-bottom: 1px solid var(--p-content-border-color); background: var(--au-card); font-size: 1rem; }
.au-logs-detail-head .au-logs-type { margin-right: 0.375rem; }
.au-logs-detail-body { display: grid; gap: 0.875rem; align-content: start; min-height: 0; overflow-y: auto; padding: 1rem; scrollbar-width: thin; }
.au-logs-detail-when { display: flex; align-items: center; justify-content: space-between; gap: 1rem; margin: 0; font-size: 1rem; font-weight: 500; color: var(--p-text-color); }
.au-logs-detail-when > span:first-child { display: inline-flex; align-items: center; gap: 0.5rem; }
.au-logs-detail-when i { font-size: 0.7rem; color: var(--p-text-muted-color); }
.au-logs-detail-when .au-logs-mono { font-weight: 400; color: var(--p-text-muted-color); }
.au-logs-props { margin: 0; border: 1px solid var(--p-content-border-color); border-radius: var(--p-border-radius-lg); background: var(--au-card); }
.au-logs-props > div { display: flex; align-items: baseline; justify-content: space-between; gap: 1rem; padding: 0.625rem 0.875rem; border-bottom: 1px solid var(--p-content-border-color); font-size: 1rem; }
.au-logs-props > div:last-child { border-bottom: 0; }
.au-logs-props dt { flex: none; color: var(--p-text-muted-color); }
.au-logs-props dd { min-width: 0; margin: 0; overflow: hidden; text-align: right; text-overflow: ellipsis; white-space: nowrap; color: var(--p-text-color); }
.au-logs-props > div.is-block { display: grid; gap: 0.25rem; }
.au-logs-props > div.is-block dd { text-align: left; white-space: normal; }
.au-logs-payload { overflow: hidden; border: 1px solid var(--p-content-border-color); border-radius: var(--p-border-radius-lg); background: var(--au-card); }
.au-logs-payload header { display: flex; align-items: center; justify-content: space-between; padding: 0.25rem 0.25rem 0.25rem 0.875rem; border-bottom: 1px solid var(--p-content-border-color); font-size: 1rem; font-weight: 500; color: var(--p-text-color); }
.au-logs-payload pre { margin: 0; padding: 0.75rem 0.875rem; overflow: auto; max-height: 22rem; font-size: 0.75rem; line-height: 1.25rem; color: var(--p-text-color); white-space: pre; }
@media (max-width: 1100px) { .au-logs-body.has-detail { grid-template-columns: minmax(0, 1fr); } .au-logs-body.has-detail .au-logs-list { display: none; } }
.au-logs-actor { display: block; overflow: hidden; text-overflow: ellipsis; color: var(--p-text-color); }
.au-logs-type { display: inline-block; padding: 0 0.375rem; line-height: 1.125rem; border: 1px solid var(--p-content-border-color); border-radius: 4px; background: var(--au-card); font-family: var(--p-au-font-mono); font-size: 0.75rem; color: var(--p-text-color); }
.au-logs-name { color: var(--p-text-color); }
.au-logs-message { max-width: 0; overflow: hidden; text-overflow: ellipsis; color: var(--p-text-muted-color); }
.au-logs-empty { height: auto !important; padding: 3rem 1rem !important; text-align: center; white-space: normal !important; color: var(--p-text-muted-color); }
.au-logs-foot { display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding: 0.375rem 0.75rem 0.375rem 1rem; border-top: 1px solid var(--p-content-border-color); color: var(--p-text-muted-color); }
@media (max-width: 900px) {
  .au-logs { grid-template-columns: minmax(0, 1fr); grid-template-rows: auto minmax(0, 1fr); }
  .au-logs-filters { max-height: 14rem; border-right: 0; border-bottom: 1px solid var(--p-content-border-color); }
}

/* ---------- Gabarits de page ---------- */
.au-page { display: grid; gap: 1.5rem; }

.au-page-head { display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap; }
.au-page-title { margin: 0; font-size: 28px; line-height: 36px; font-weight: 500; letter-spacing: -0.01em; color: var(--p-text-color); }
.au-page-actions { display: flex; gap: 0.5rem; flex-wrap: wrap; }
.au-overview { display: grid; grid-template-columns: minmax(0, 2fr) minmax(280px, 1fr); gap: 1.5rem; align-items: start; }
.au-overview > * { min-width: 0; display: grid; gap: 1.5rem; }
/* La synthèse (colonne de droite) reste visible pendant que le contenu défile. */
.au-overview > aside { position: sticky; top: 2rem; }
@media (max-width: 1024px) { .au-overview { grid-template-columns: minmax(0, 1fr); } .au-overview > aside { position: static; } }
/* Filtres d'une liste : pilules segmentées (p-selectbutton.au-filter) à gauche, recherche à droite. */
.au-filters { display: flex; align-items: center; justify-content: space-between; gap: 0.75rem; flex-wrap: wrap; }
.au-filters .au-search { width: 20rem; max-width: 100%; }
/* La recherche a la même hauteur que la rangée de pilules (34px + 2 × 4px de conteneur). */
.au-filters .au-search .p-inputtext { height: 42px; }
.au-filter.p-selectbutton { gap: 2px; padding: 4px; border-radius: 999px; background: var(--au-panel); }
.au-filter.p-selectbutton .p-togglebutton { padding: 0; border: 0 !important; border-radius: 999px !important; background: transparent; color: var(--p-text-muted-color); font-weight: 500; }
.au-filter.p-selectbutton .p-togglebutton-content { height: 34px; padding: 0 1rem; border-radius: 999px; }
.au-filter.p-selectbutton .p-togglebutton:not(:disabled):not(.p-togglebutton-checked):hover { background: transparent; color: var(--p-text-color); }
.au-filter.p-selectbutton .p-togglebutton.p-togglebutton-checked { background: transparent; color: var(--p-text-color); }
.au-filter.p-selectbutton .p-togglebutton-checked .p-togglebutton-content { background: var(--au-active); box-shadow: 0 1px 2px rgba(16, 24, 48, 0.08); }
.au-kv { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem 1.5rem; margin: 0; padding: 1rem; border: 1px solid var(--p-content-border-color); border-radius: var(--p-border-radius-lg); }
.au-kv dt { font-size: 12px; line-height: 16px; color: var(--p-text-muted-color); }
.au-kv dd { margin: 2px 0 0; font-weight: 500; overflow-wrap: anywhere; }

/* ---------- Connexion : le dégradé du bandeau en plein écran, une carte compacte au centre ---------- */
.au-login { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1.5rem; min-height: 100dvh; padding: 2rem 1rem; background-color: #000; background-image: var(--p-au-shell-gradient); background-repeat: no-repeat; background-size: 100% 100%; }
.au-login-card { display: flex; flex-direction: column; gap: 1.5rem; width: 100%; max-width: 26rem; padding: 2rem; border: 1px solid var(--p-content-border-color); border-radius: var(--p-border-radius-xl); background: var(--au-card); box-shadow: 0 24px 64px -24px rgba(0, 0, 0, 0.55); }
.au-login-head { display: flex; align-items: center; gap: 0.625rem; }
.au-login-logo { display: grid; place-items: center; width: 2.25rem; height: 2.25rem; border: 1px solid var(--p-content-border-color); border-radius: var(--p-border-radius-md); background: var(--au-on-color); }
.au-login-brand { font-size: 1rem; font-weight: 600; letter-spacing: -0.01em; color: var(--p-text-color); }
.au-login-title { margin: 0; font-size: 1.5rem; line-height: 2rem; font-weight: 600; letter-spacing: -0.015em; color: var(--p-text-color); }
.au-login-sub { margin: 0.25rem 0 0; font-size: 0.875rem; color: var(--p-text-muted-color); }
.au-login-or { display: flex; align-items: center; gap: 0.75rem; font-size: 0.8125rem; color: var(--p-text-muted-color); }
.au-login-or::before, .au-login-or::after { content: ''; flex: 1; height: 1px; background: var(--p-content-border-color); }
.au-google-button { gap: 0.625rem; }
.au-login-foot { margin: 0; font-size: 0.8125rem; color: rgba(255, 255, 255, 0.55); }

/* ---------- Espace ouvert : seconde barre latérale collée à celle de l'école ---------- */
.au-space-layout { display: grid; grid-template-columns: 15rem minmax(0, 1fr); flex: 1; min-height: 0; min-width: 0; }
.au-space-nav { border-right: 1px solid var(--p-content-border-color); background: var(--au-subtle); }
.au-space-id { display: flex; align-items: center; gap: 0.625rem; margin: 0.25rem 0 0.75rem; padding: 0 0.75rem; }
.au-space-id .pi { flex: none; font-size: 0.875rem; color: var(--p-text-muted-color); }
.au-space-name { min-width: 0; overflow: hidden; font-weight: 600; color: var(--p-text-color); text-overflow: ellipsis; white-space: nowrap; }
@media (max-width: 899px) { .au-space-layout { grid-template-columns: minmax(0, 1fr); } .au-space-nav { border-right: 0; border-bottom: 1px solid var(--p-content-border-color); } }
/* État vide centré dans une carte : pastille d'icône neutre, titre, phrase. */
.au-empty { display: grid; justify-items: center; gap: 0.5rem; padding: 3.5rem 1.5rem; text-align: center; }
.au-empty-icon { display: grid; place-items: center; width: 3rem; height: 3rem; margin-bottom: 0.5rem; border-radius: var(--p-border-radius-lg); background: var(--au-panel); color: var(--p-text-muted-color); font-size: 1.25rem; }
.au-empty-title { margin: 0; font-size: 1rem; font-weight: 600; color: var(--p-text-color); }
.au-empty-text { max-width: 36ch; margin: 0; font-size: 0.875rem; color: var(--p-text-muted-color); }

/* ---------- Cartes d'écoles (grille de la page Écoles) : neutres, bordées, sans couleur de fond ---------- */
.au-school-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr)); gap: 1.25rem; margin: 0; padding: 0; list-style: none; }
.au-school-card { display: flex; flex-direction: column; gap: 1.75rem; height: 100%; padding: 1.75rem; border: 1px solid var(--p-content-border-color); border-radius: var(--p-border-radius-xl); background: var(--au-card); color: var(--p-text-color); text-decoration: none; transition: border-color 150ms, box-shadow 150ms; }
.au-school-card:hover { border-color: var(--au-border-strong); box-shadow: 0 6px 20px -12px rgba(16, 24, 48, 0.25); }
.au-school-card:focus-visible { outline: 2px solid var(--p-primary-color); outline-offset: 2px; }
.au-school-card-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem; }
.au-school-logo { display: grid; place-items: center; width: 3rem; height: 3rem; flex: none; overflow: hidden; border: 1px solid var(--p-content-border-color); border-radius: var(--p-border-radius-lg); background: var(--au-card); font-size: 1.25rem; font-weight: 600; color: var(--p-text-color); }
.au-school-logo img { width: 100%; height: 100%; padding: 0.25rem; object-fit: contain; }
.au-school-logo.is-initial { border-color: transparent; background: var(--au-panel); }
.au-school-name { margin: 0; overflow: hidden; font-size: 1.0625rem; font-weight: 600; line-height: 1.5rem; text-overflow: ellipsis; white-space: nowrap; }
.au-school-site { margin: 0.25rem 0 0; overflow: hidden; font-size: 0.875rem; color: var(--p-text-muted-color); text-overflow: ellipsis; white-space: nowrap; }

/* ---------- Panneaux de réglages (cartes à en-tête, façon hPanel « Account information ») ---------- */
/* <p-card class="au-flush au-panel"> > .au-panel-head, .au-panel-desc, .au-panel-row… */
.au-panel-head { display: flex; align-items: center; gap: 0.75rem; padding: 1rem 1.5rem; border-bottom: 1px solid var(--p-content-border-color); }
.au-panel-head h2 { margin: 0; font-size: 1rem; font-weight: 600; color: var(--p-text-color); }
.au-panel-icon { display: grid; place-items: center; width: 2rem; height: 2rem; flex: none; border-radius: var(--p-border-radius-md); background: var(--p-primary-100); color: var(--p-primary-color); }
.au-panel-icon.is-danger { background: var(--p-au-danger-soft); color: var(--p-au-danger); }
.au-panel-desc { margin: 0; padding: 0.875rem 1.5rem; font-size: 1rem; color: var(--p-text-muted-color); border-bottom: 1px solid var(--p-content-border-color); background: var(--au-subtle); }
.au-panel-row { display: grid; grid-template-columns: minmax(9rem, 1fr) minmax(0, 2fr) 2.5rem; align-items: center; gap: 1rem; min-height: 4rem; padding: 0.625rem 1.5rem; border-bottom: 1px solid var(--p-content-border-color); }
.au-panel-row:last-child { border-bottom: 0; }
.au-panel-row > dt { font-size: 1rem; color: var(--p-text-muted-color); }
.au-panel-row > dd { margin: 0; min-width: 0; font-size: 1rem; font-weight: 500; color: var(--p-text-color); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.au-panel-row > .au-panel-action { justify-self: end; }
/* Ligne en cours d'édition : la valeur devient un champ, l'action deux boutons (enregistrer / annuler). */
.au-panel-row.is-editing { grid-template-columns: minmax(9rem, 1fr) minmax(0, 2fr) auto; background: var(--au-subtle); }
.au-panel-row.is-editing > dd.au-panel-edit { display: grid; gap: 0.25rem; overflow: visible; white-space: normal; font-weight: 400; }
@media (max-width: 640px) { .au-panel-row { grid-template-columns: minmax(0, 1fr) 2.5rem; } .au-panel-row > dd { grid-column: 1; grid-row: 2; } .au-panel-row > .au-panel-action { grid-row: 1 / span 2; grid-column: 2; } }
.au-panel-body { padding: 1.25rem 1.5rem; }
/* Paramètres d'un objet (façon Stripe / Linear) : en-tête d'identité, puis sections
   « intitulé et explication | contenu ». Neutre : le bleu reste aux actions principales. */
.au-settings-hero { display: flex; align-items: center; gap: 1.25rem; padding-bottom: 1.5rem; border-bottom: 1px solid var(--p-content-border-color); }
.au-settings-meta { display: flex; flex-wrap: wrap; align-items: center; gap: 0.375rem 0.5rem; margin: 0.5rem 0 0; font-size: 1rem; color: var(--p-text-muted-color); }
.au-settings { display: grid; }
.au-settings-section { display: grid; grid-template-columns: minmax(0, 17rem) minmax(0, 1fr); gap: 1.5rem 3rem; padding: 2rem 0; border-bottom: 1px solid var(--p-content-border-color); }
.au-settings-section:first-child { padding-top: 0.5rem; }
.au-settings-section:last-child { border-bottom: 0; }
.au-settings-intro h2 { margin: 0; font-size: 1rem; line-height: 1.5rem; font-weight: 600; color: var(--p-text-color); }
.au-settings-intro p { margin: 0.375rem 0 0; font-size: 1rem; line-height: 1.375rem; color: var(--p-text-muted-color); max-width: 32ch; }
.au-settings-item { display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap; min-height: 4rem; padding: 0.875rem 1.5rem; border-bottom: 1px solid var(--p-content-border-color); }
.au-settings-item:last-child { border-bottom: 0; }
.au-settings-item-title { margin: 0; font-size: 1rem; font-weight: 600; color: var(--p-text-color); }
.au-settings-item-text { margin: 0.25rem 0 0; font-size: 1rem; line-height: 1.375rem; color: var(--p-text-muted-color); max-width: 56ch; }
.au-settings-footer { display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap; padding: 0.75rem 1.5rem; border-top: 1px solid var(--p-content-border-color); background: var(--au-subtle); font-size: 1rem; color: var(--p-text-muted-color); }
.au-settings-danger { border-color: color-mix(in srgb, var(--p-au-danger) 30%, var(--p-content-border-color)) !important; }
@media (max-width: 900px) { .au-settings-section { grid-template-columns: minmax(0, 1fr); gap: 1rem; } }
@media (max-width: 640px) { .au-settings-hero { align-items: flex-start; } }
/* Identité d'un objet en tête de son panneau Profil : logo (ou initiale), nom, statut. */
.au-identity { display: flex; align-items: center; gap: 1rem; padding: 1.25rem 1.5rem; }
.au-identity-logo { display: grid; place-items: center; width: 4rem; height: 4rem; flex: none; overflow: hidden; padding: 0.375rem; border: 1px solid var(--p-content-border-color); border-radius: var(--p-border-radius-lg); background: var(--au-card); }
.au-identity-logo img { width: 100%; height: 100%; object-fit: contain; }
.au-identity-logo.is-initial { padding: 0; background: var(--au-panel); color: var(--p-text-color); font-size: 1.5rem; font-weight: 600; }
.au-identity-name { margin: 0; font-size: 1.25rem; line-height: 1.75rem; font-weight: 600; color: var(--p-text-color); overflow-wrap: anywhere; }

/* Ligne d'action et zone sensible (façon Supabase). */
.au-setting-row { display: flex; align-items: center; gap: 1rem; flex-wrap: wrap; padding: 1rem 1.25rem; border: 1px solid var(--p-content-border-color); border-radius: var(--p-border-radius-lg); background: var(--au-card); }
.au-setting-icon { display: grid; place-items: center; width: 2rem; height: 2rem; flex: none; border-radius: var(--p-border-radius-md); color: var(--p-text-muted-color); }
.au-setting-body { flex: 1; min-width: 14rem; }
.au-setting-body h3 { margin: 0; font-size: 1rem; font-weight: 600; color: var(--p-text-color); }
.au-setting-body p { margin: 0.25rem 0 0; font-size: 1rem; line-height: 1.375rem; color: var(--p-text-muted-color); }
.au-danger-zone { display: flex; gap: 0.875rem; padding: 1rem 1.25rem; border: 1px solid color-mix(in srgb, var(--p-au-danger) 25%, transparent); border-radius: var(--p-border-radius-lg); background: color-mix(in srgb, var(--p-au-danger-soft) 45%, var(--au-card)); }
.au-danger-zone .au-setting-icon { background: var(--p-au-danger); color: var(--au-on-color); width: 1.75rem; height: 1.75rem; }

/* ---------- Notifications (popups) ---------- */
/* Position : en haut à droite, sous le bandeau (52px) ; largeur 22rem. */
/* !important : p-toast écrit top/right dans un style inline, sans entrée pour les régler. */
.au-toast.p-toast-top-right { top: 4.25rem !important; right: 1.5rem !important; width: 22rem; }
@media (max-width: 640px) { .au-toast.p-toast-top-right { right: 1rem !important; width: calc(100vw - 2rem); } }
.au-toast .p-toast-message { margin-bottom: 0.75rem; border: 1px solid var(--p-content-border-color); border-radius: var(--p-border-radius-lg); background: var(--au-card); color: var(--p-text-color); box-shadow: var(--p-au-float-shadow); backdrop-filter: none; }
.au-toast .p-toast-message-content { padding: 0.875rem 1rem; border: 0; align-items: flex-start; }
.au-toast .p-toast-close-button { border: 0; outline: 0; box-shadow: none; color: var(--p-text-muted-color); }
.au-toast .p-toast-close-button:focus-visible { outline: 2px solid var(--p-primary-color); outline-offset: 1px; }
.au-toast .p-toast-close-button:hover { background: var(--au-hover); }
.au-toast-body { display: flex; align-items: flex-start; gap: 0.75rem; flex: 1; min-width: 0; }
.au-toast-icon { display: grid; place-items: center; width: 1.5rem; height: 1.5rem; flex: none; border-radius: 999px; color: var(--au-on-color); font-size: 0.75rem; }
.au-toast-icon[data-severity='success'] { background: var(--p-au-success); }
.au-toast-icon[data-severity='info'] { background: var(--p-primary-color); }
.au-toast-icon[data-severity='warn'] { background: var(--p-au-warning); }
.au-toast-icon[data-severity='error'] { background: var(--p-au-danger); }
.au-toast-summary { margin: 0; font-size: 1rem; font-weight: 600; line-height: 1.5rem; }
.au-toast-detail { margin: 0.125rem 0 0; font-size: 1rem; line-height: 1.375rem; color: var(--p-text-muted-color); }

/* ---------- Organigramme des espaces ---------- */
.space-org-node--root.p-organizationchart-node, .space-org-node--root .p-organizationchart-node { border-color: var(--p-primary-color); }
.space-org-node--archived.p-organizationchart-node, .space-org-node--archived .p-organizationchart-node { opacity: 0.7; }

/* Action destructive dans un menu (MenuItem.styleClass = 'au-menu-danger'). */
.au-menu-danger .p-menu-item-label, .au-menu-danger .p-menu-item-icon { color: var(--p-au-danger); }

/* Zone qui défile sans barre visible (molette, trackpad, glisser). */
.au-scroll-hidden { scrollbar-width: none; -ms-overflow-style: none; }
/* Barre de défilement fine et visible, aux couleurs du thème. */
.au-scroll-thin { scrollbar-width: thin; scrollbar-color: var(--au-border-strong) transparent; }
.au-scroll-hidden::-webkit-scrollbar { display: none; }
/* L'organigramme PrimeNG a son propre défilement : on le laisse au conteneur. */
.au-scroll-hidden .p-organizationchart { overflow: visible; }
/* ---------- Modal du thème (app-modal, sur p-dialog) ---------- */
/* Sobre et compact : blanc, filet, ombre douce. Les variantes ne changent que la pastille d'icône
   (et la mise en page pour spotlight), jamais le fond. */
.au-modal.p-dialog { border: 1px solid var(--p-content-border-color); border-radius: var(--p-border-radius-lg); box-shadow: 0 1px 2px rgba(16, 24, 48, 0.04), 0 16px 40px -12px rgba(16, 24, 48, 0.22); }
.au-modal .p-dialog-header { align-items: flex-start; gap: 0.75rem; padding: 1.25rem 1rem 0 1.5rem; }
.au-modal .p-dialog-header-actions { margin-top: -0.25rem; }
.au-modal .p-dialog-close-button { width: 2rem; height: 2rem; color: var(--p-text-muted-color); }
.au-modal .p-dialog-content { padding: 1.25rem 1.5rem 1.5rem; }
.au-modal .p-dialog-footer { display: flex; justify-content: flex-end; gap: 0.5rem; padding: 1rem 1.5rem; border-top: 1px solid var(--p-content-border-color); }
.au-modal .p-dialog-footer:empty { display: none; }
.au-modal-head { display: flex; align-items: flex-start; gap: 0.875rem; min-width: 0; }
/* Pastille d'icône « contour » : blanche, filet, ombre légère (neutral). */
.au-modal-icon { display: grid; place-items: center; width: 2.25rem; height: 2.25rem; flex: none; border: 1px solid var(--p-content-border-color); border-radius: var(--p-border-radius-md); background: var(--au-card); color: var(--p-text-color); font-size: 0.95rem; box-shadow: 0 1px 2px rgba(16, 24, 48, 0.06); }
.au-modal-heading { min-width: 0; }
.au-modal-title { margin: 0; font-size: 1rem; line-height: 1.5rem; font-weight: 600; color: var(--p-text-color); text-wrap: balance; }
.au-modal-description { margin: 0.125rem 0 0; font-size: 1rem; line-height: 1.375rem; color: var(--p-text-muted-color); text-wrap: pretty; }
.au-modal-icon + .au-modal-heading { padding-top: 0.0625rem; }

/* brand : la pastille prend la couleur de l'action (bleu du A). */
.au-modal--brand .au-modal-icon { border-color: transparent; background: var(--p-primary-100); color: var(--p-primary-color); box-shadow: none; }
/* danger : la pastille passe au rouge, l'action principale est en severity="danger". */
.au-modal--danger .au-modal-icon { border-color: transparent; background: var(--p-au-danger-soft); color: var(--p-au-danger); box-shadow: none; }
/* spotlight : confirmation de succès ou annonce courte, centrée. */
.au-modal--spotlight .p-dialog-header { position: relative; justify-content: center; padding: 1.75rem 1.5rem 0; text-align: center; }
.au-modal--spotlight .au-modal-head { flex-direction: column; align-items: center; gap: 0.875rem; }
.au-modal--spotlight .au-modal-icon { width: 3rem; height: 3rem; border-radius: 999px; font-size: 1.15rem; }
.au-modal--spotlight .p-dialog-header-actions { position: absolute; top: 0.75rem; right: 0.75rem; margin: 0; }
.au-modal--spotlight .p-dialog-content { text-align: center; }
.au-modal--spotlight .p-dialog-footer { justify-content: center; border-top: 0; padding-top: 0; padding-bottom: 1.5rem; }

@media (max-width: 640px) {
  .au-modal .p-dialog-footer { flex-direction: column-reverse; align-items: stretch; }
}

/* Organigramme : la carte du graphe, et ses commandes dans une barre verticale à côté (façon canevas). */
.au-org-node { cursor: pointer; border-radius: var(--p-border-radius-md); }
.au-org-node:focus-visible { outline: 2px solid var(--p-primary-color); outline-offset: 6px; }
.au-chart-layout { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 0.75rem; align-items: start; }
.au-chart-card { min-height: 24rem; }
/* Hauteur fixe : la carte et son contenu forment une colonne, la zone de l'arbre prend le reste et défile. */
.au-chart-card, .au-chart-card .p-card-body, .au-chart-card .p-card-content { display: flex; flex-direction: column; min-height: 0; }
.au-chart-card .p-card-body, .au-chart-card .p-card-content { flex: 1; }
.au-chart-viewport { flex: 1; min-height: 0; overflow: auto; padding: 1.5rem 1.25rem 2rem; overscroll-behavior: contain; scrollbar-width: thin; scrollbar-color: var(--au-border-strong) transparent; }
.au-chart-viewport::-webkit-scrollbar { width: 10px; height: 10px; }
.au-chart-viewport::-webkit-scrollbar-track { background: transparent; }
.au-chart-viewport::-webkit-scrollbar-thumb { border: 3px solid transparent; border-radius: 999px; background: var(--au-border-strong); background-clip: padding-box; }
.au-chart-viewport::-webkit-scrollbar-thumb:hover { background-color: var(--au-border-hover); }
.au-chart-viewport .p-organizationchart { overflow: visible; }
/* Fond de canevas : gris très clair et grille de points, pour détacher les nœuds blancs sans ajouter de couleur. */
.au-chart-card.p-card { background-color: var(--au-subtle); background-image: radial-gradient(var(--au-border-strong) 1px, transparent 1px); background-size: 20px 20px; background-position: 10px 10px; }
.au-chart-card .p-organizationchart-node:not(.space-org-node--root, .space-org-node--root *) { border-color: var(--au-border-strong); }
.au-chart-card .p-organizationchart-node:not(.space-org-node--root, .space-org-node--root *):hover { border-color: var(--au-border-hover); }
.au-chart-rail { position: sticky; top: 1rem; display: flex; flex-direction: column; align-items: center; gap: 0.25rem; padding: 0.375rem; border: 1px solid var(--p-content-border-color); border-radius: var(--p-border-radius-lg); background: var(--au-card); }
.au-chart-zoom { width: 2.5rem; padding: 0.125rem 0; text-align: center; font-size: 0.75rem; font-weight: 500; color: var(--p-text-muted-color); }
.au-chart-rail-sep { width: 1.25rem; height: 1px; margin: 0.25rem 0; background: var(--p-content-border-color); }
@media (max-width: 640px) {
  .au-chart-layout { grid-template-columns: minmax(0, 1fr); }
  .au-chart-rail { position: static; order: -1; flex-direction: row; justify-self: end; }
  .au-chart-rail-sep { width: 1px; height: 1.25rem; margin: 0 0.25rem; }
}

/* ---------- Tableaux : un seul rendu ---------- */
.p-datatable .p-datatable-thead > tr > th { white-space: nowrap; font-size: 1rem; font-weight: 600; color: var(--au-text-head); }
.p-datatable .p-datatable-tbody > tr > td { height: 64px; }
.p-datatable .p-datatable-tbody > tr:last-child > td { border-bottom: 0; }
.p-card.au-flush .p-paginator { border-top: 1px solid var(--p-content-border-color); border-radius: 0; }
.au-col-actions { width: 56px; text-align: right; white-space: nowrap; }
.au-num { font-variant-numeric: tabular-nums; white-space: nowrap; }
`,
});
