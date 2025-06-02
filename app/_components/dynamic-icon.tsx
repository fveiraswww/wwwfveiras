import type icon from '@radix-ui/react-icons'
import type { IconProps } from '@radix-ui/react-icons/dist/types'

const localIcons = {
  X: () => (
    <svg
      viewBox="0 0 21.57 19.5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-3 h-3 flex"
    >
      <path
        d="M16.99 0h3.308l-7.227 8.26 8.502 11.24h-6.657l-5.214-6.817L3.736 19.5H.426l7.73-8.835L0 0h6.826l4.713 6.231L16.99 0Zm-1.161 17.52h1.833L5.83 1.876H3.863L15.829 17.52Z"
        fill="currentColor"
      />
    </svg>
  ),
  Issue: () => (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.49991 0.877075C3.84222 0.877075 0.877075 3.84222 0.877075 7.49991C0.877075 11.1576 3.84222 14.1227 7.49991 14.1227C11.1576 14.1227 14.1227 11.1576 14.1227 7.49991C14.1227 3.84222 11.1576 0.877075 7.49991 0.877075ZM1.82708 7.49991C1.82708 4.36689 4.36689 1.82707 7.49991 1.82707C10.6329 1.82707 13.1727 4.36689 13.1727 7.49991C13.1727 10.6329 10.6329 13.1727 7.49991 13.1727C4.36689 13.1727 1.82708 10.6329 1.82708 7.49991ZM8.37287 7.50006C8.37287 7.98196 7.98221 8.37263 7.5003 8.37263C7.01839 8.37263 6.62773 7.98196 6.62773 7.50006C6.62773 7.01815 7.01839 6.62748 7.5003 6.62748C7.98221 6.62748 8.37287 7.01815 8.37287 7.50006ZM9.32287 7.50006C9.32287 8.50664 8.50688 9.32263 7.5003 9.32263C6.49372 9.32263 5.67773 8.50664 5.67773 7.50006C5.67773 6.49348 6.49372 5.67748 7.5003 5.67748C8.50688 5.67748 9.32287 6.49348 9.32287 7.50006Z"
        fill="currentColor"
        fill-rule="evenodd"
        clip-rule="evenodd"
      ></path>
    </svg>
  ),
  Pr: () => (
    <svg
      width="15"
      height="15"
      viewBox="0 0 500 500"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title />
      <circle
        cx="128"
        cy="416"
        r="48"
        fill="none"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
      />
      <line
        fill="none"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
        x1="128"
        x2="128"
        y1="144"
        y2="368"
      />
      <polyline
        points="288,160 224,96 288,32"
        style={{
          fill: 'none',
          stroke: '#fff',
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          strokeWidth: '32px',
        }}
      />
      <circle
        cx={128}
        cy={96}
        r={48}
        style={{
          fill: 'none',
          stroke: '#fff',
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          strokeWidth: '32px',
        }}
      />
      <circle
        cx={384}
        cy={416}
        r={48}
        style={{
          fill: 'none',
          stroke: '#fff',
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          strokeWidth: '32px',
        }}
      />
      <path
        d="M240,96h84a60,60,0,0,1,60,60V368"
        style={{
          fill: 'none',
          stroke: '#fff',
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          strokeWidth: '32px',
        }}
      />
    </svg>
  ),
  Closed: () => (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.49991 0.877045C3.84222 0.877045 0.877075 3.84219 0.877075 7.49988C0.877075 11.1575 3.84222 14.1227 7.49991 14.1227C11.1576 14.1227 14.1227 11.1575 14.1227 7.49988C14.1227 3.84219 11.1576 0.877045 7.49991 0.877045ZM1.82708 7.49988C1.82708 4.36686 4.36689 1.82704 7.49991 1.82704C10.6329 1.82704 13.1727 4.36686 13.1727 7.49988C13.1727 10.6329 10.6329 13.1727 7.49991 13.1727C4.36689 13.1727 1.82708 10.6329 1.82708 7.49988ZM10.1589 5.53774C10.3178 5.31191 10.2636 5.00001 10.0378 4.84109C9.81194 4.68217 9.50004 4.73642 9.34112 4.96225L6.51977 8.97154L5.35681 7.78706C5.16334 7.59002 4.84677 7.58711 4.64973 7.78058C4.45268 7.97404 4.44978 8.29061 4.64325 8.48765L6.22658 10.1003C6.33054 10.2062 6.47617 10.2604 6.62407 10.2483C6.77197 10.2363 6.90686 10.1591 6.99226 10.0377L10.1589 5.53774Z"
        fill="currentColor"
        fill-rule="evenodd"
        clip-rule="evenodd"
      ></path>
    </svg>
  ),
}

export const DynamicIcon = async ({
  name,
  props,
}: {
  name: keyof typeof icon | keyof typeof localIcons
  props?: IconProps
}) => {
  const icons = await import('@radix-ui/react-icons')
  const Icon =
    icons[name as keyof typeof icon] ??
    localIcons[name as keyof typeof localIcons]

  return (
    <>
      <Icon {...props} />
    </>
  )
}
