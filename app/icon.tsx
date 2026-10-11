import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const size = {
	width: 64,
	height: 64,
};
export const contentType = 'image/png';

// Image generation
export default function Icon() {
	return new ImageResponse(
		(
			<div
				style={{
					width: '100%',
					height: '100%',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					background: 'transparent',
				}}
			>
				<svg
					width="64"
					height="40"
					viewBox="0 0 64 40"
					fill="#D85C41"
					style={{ width: '100%', height: '100%' }}
				>
					{/* We use the exact compound path logic from our navbar logo so it has perfectly transparent cutouts! */}
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M8,4 h48 a4,4 0 0,1 4,4 v6 a6,6 0 0,0 0,12 v6 a4,4 0 0,1 -4,4 h-48 a4,4 0 0,1 -4,-4 v-6 a6,6 0 0,0 0,-12 v-6 a4,4 0 0,1 4,-4 Z M 44 12 h2 v16 h-2 Z M 48 12 h3 v16 h-3 Z M 53 12 h1 v16 h-1 Z M 14 12 h10 v2 h-10 Z M 14 16 h6 v2 h-6 Z M 16 26 a1.5,1.5 0 1,0 0,3 a1.5,1.5 0 1,0 0,-3 Z M 22 25 a1.5,1.5 0 1,0 0,3 a1.5,1.5 0 1,0 0,-3 Z M 28 22 a1.5,1.5 0 1,0 0,3 a1.5,1.5 0 1,0 0,-3 Z M 37 11.5 l 1.5 1.5 l -4 4 l 1.5 4 l -1.5 1 l -2 -3 l -3 1 l -0.5 -1.5 l 2 -1 l -1.5 -3 l 1.5 -1.5 l 3 2.5 l 3 -3 Z"
					/>
				</svg>
			</div>
		),
		{
			...size,
		}
	);
}
