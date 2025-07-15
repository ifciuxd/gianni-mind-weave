import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Sophisticated Gianni color system
				gianni: {
					orange: 'hsl(var(--gianni-orange))',
					'orange-glow': 'hsl(var(--gianni-orange-glow))',
					'orange-soft': 'hsl(var(--gianni-orange-soft))',
					dark: 'hsl(var(--gianni-dark))',
					card: 'hsl(var(--gianni-card))',
					'card-hover': 'hsl(var(--gianni-card-hover))',
					'card-elevated': 'hsl(var(--gianni-card-elevated))',
					'text-primary': 'hsl(var(--gianni-text-primary))',
					'text-secondary': 'hsl(var(--gianni-text-secondary))',
					'text-tertiary': 'hsl(var(--gianni-text-tertiary))'
				},
				// Glass morphism colors
				glass: {
					white: 'hsl(var(--glass-white))',
					orange: 'hsl(var(--glass-orange))',
					border: 'hsl(var(--glass-border))'
				}
			},
			backgroundImage: {
				'gradient-orange': 'var(--gradient-orange)',
				'gradient-orange-soft': 'var(--gradient-orange-soft)',
				'gradient-dark': 'var(--gradient-dark)',
				'gradient-glow': 'var(--gradient-glow)',
				'gradient-mesh': 'var(--gradient-mesh)'
			},
			boxShadow: {
				'orange': 'var(--shadow-orange)',
				'orange-glow': 'var(--shadow-orange-glow)',
				'card': 'var(--shadow-card)',
				'card-hover': 'var(--shadow-card-hover)',
				'glass': 'var(--shadow-glass)'
			},
			fontFamily: {
				'helvetica': ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
				'inter': ['Inter', 'system-ui', 'sans-serif']
			},
			fontSize: {
				'display-lg': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
				'display': ['3.75rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
				'display-sm': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
			},
			animation: {
				// Staggered reveals
				'fade-in': 'fadeIn 0.6s var(--ease-apple) forwards',
				'fade-in-delay-1': 'fadeIn 0.6s var(--ease-apple) 0.1s forwards',
				'fade-in-delay-2': 'fadeIn 0.6s var(--ease-apple) 0.2s forwards',
				'fade-in-delay-3': 'fadeIn 0.6s var(--ease-apple) 0.3s forwards',
				
				// Sophisticated entrances
				'slide-up': 'slideUp 0.8s var(--ease-spring) forwards',
				'slide-up-delay-1': 'slideUp 0.8s var(--ease-spring) 0.1s forwards',
				'slide-up-delay-2': 'slideUp 0.8s var(--ease-spring) 0.2s forwards',
				'slide-up-delay-3': 'slideUp 0.8s var(--ease-spring) 0.3s forwards',
				
				// Scale animations
				'scale-in': 'scaleIn 0.5s var(--ease-spring) forwards',
				'scale-in-subtle': 'scaleInSubtle 0.4s var(--ease-apple) forwards',
				
				// Kinetic typography
				'title-reveal': 'titleReveal 1.2s var(--ease-spring) forwards',
				'char-reveal': 'charReveal 0.8s var(--ease-apple) forwards',
				
				// Magnetic effects
				'magnetic-hover': 'magneticHover 0.3s var(--ease-apple) forwards',
				'float': 'float 6s ease-in-out infinite',
				
				// Advanced glows
				'glow-pulse': 'glowPulse 3s ease-in-out infinite',
				'orange-glow': 'orangeGlow 2s ease-in-out infinite',
				
				// Glass morphism
				'glass-fade': 'glassFade 0.4s var(--ease-apple) forwards',
			},
			keyframes: {
				// Entrance animations
				fadeIn: {
					'0%': { opacity: '0', transform: 'translateY(24px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				slideUp: {
					'0%': { opacity: '0', transform: 'translateY(40px) scale(0.95)' },
					'100%': { opacity: '1', transform: 'translateY(0) scale(1)' }
				},
				scaleIn: {
					'0%': { opacity: '0', transform: 'scale(0.8)' },
					'100%': { opacity: '1', transform: 'scale(1)' }
				},
				scaleInSubtle: {
					'0%': { opacity: '0', transform: 'scale(0.95)' },
					'100%': { opacity: '1', transform: 'scale(1)' }
				},
				
				// Typography animations
				titleReveal: {
					'0%': { opacity: '0', transform: 'translateY(60px) rotate(-2deg)', filter: 'blur(4px)' },
					'100%': { opacity: '1', transform: 'translateY(0) rotate(0deg)', filter: 'blur(0px)' }
				},
				charReveal: {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				
				// Interactive effects
				magneticHover: {
					'0%': { transform: 'scale(1) rotate(0deg)' },
					'50%': { transform: 'scale(1.05) rotate(-1deg)' },
					'100%': { transform: 'scale(1.02) rotate(0deg)' }
				},
				float: {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				
				// Glow effects
				glowPulse: {
					'0%, 100%': { boxShadow: '0 0 20px hsl(var(--gianni-orange) / 0.3)' },
					'50%': { boxShadow: '0 0 60px hsl(var(--gianni-orange) / 0.6)' }
				},
				orangeGlow: {
					'0%, 100%': { 
						filter: 'drop-shadow(0 0 10px hsl(var(--gianni-orange) / 0.4))',
						transform: 'scale(1)'
					},
					'50%': { 
						filter: 'drop-shadow(0 0 20px hsl(var(--gianni-orange) / 0.8))',
						transform: 'scale(1.02)'
					}
				},
				
				// Glass morphism
				glassFade: {
					'0%': { opacity: '0', backdropFilter: 'blur(0px)' },
					'100%': { opacity: '1', backdropFilter: 'blur(12px)' }
				}
			},
			transitionTimingFunction: {
				'apple': 'var(--ease-apple)',
				'spring': 'var(--ease-spring)',
				'smooth': 'var(--ease-smooth)',
				'gentle': 'var(--ease-gentle)'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
