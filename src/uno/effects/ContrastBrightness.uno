using Uno;
using Uno.Collections;
using Uno.Graphics;
using Uno.UX;
using Fuse.Effects;
using Fuse;
namespace Effects
{
	public sealed class ContrastBrightness : BasicEffect
	{
		public ContrastBrightness() : base(EffectType.Composition)
		{
		}

		float _contrast = 1;
		/**
			The amount of contrast to apply.
			p>1 means more contrast and 0<p<1 less contrast
		*/
		public float Contrast
		{
			get { return _contrast; }
			set
			{
				if (_contrast != value)
				{
					_contrast = value;
					OnRenderingChanged();
				}
			}
		}

		float _brightness = 0;
		/**
			The amount of brightness to apply
			values can be -1..1 
		*/
		public float Brightness
		{
			get { return _brightness; }
			set
			{
				if (_brightness != value)
				{
					_brightness = value;
					OnRenderingChanged();
				}
			}
		}

		protected override void OnRender(DrawContext dc, Rect elementRect)
		{
			var original = Element.CaptureRegion(dc, elementRect, int2(0));
			if (original == null)
				return;

			draw Fuse.Drawing.Planar.Image
			{
				DrawContext: dc;
				Visual: Element;
				Position: elementRect.Minimum;
				Invert: true;
				Size: elementRect.Size;
				Texture: original.ColorBuffer;
				TextureColor: float4(prev TextureColor.XYZ / Math.Max(prev TextureColor.W, 1e-5f), prev TextureColor.W);
				PixelColor: float4(((TextureColor.XYZ - 0.5f) * Math.Max(Contrast, 0)) + 0.5f + Brightness, TextureColor.W);
			};

			FramebufferPool.Release(original);
		}
	}
}
