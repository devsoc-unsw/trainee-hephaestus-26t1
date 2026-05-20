function TreeIcon({
  hours,
  colour,
  opacity,
}: {
  hours: string;
  colour: string;
  opacity: string;
}) {
  if (hours === "2") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill={colour}
        viewBox="0 0 68 68"
        fillOpacity={opacity}
        className="h-full w-full"
      >
        <g filter="url(#filter0_d_8_113)">
          <path
            d="M29.1841 15.4339C29.2612 14.8554 30.0982 14.8554 30.1753 15.4339L31.9219 28.5311C31.966 28.8619 32.3158 29.0575 32.6207 28.9218L43.6522 24.0144C44.1713 23.7835 44.6122 24.4598 44.1914 24.8416L34.7489 33.4084C34.5302 33.6069 34.5302 33.9506 34.7489 34.149L44.1914 42.7159C44.6122 43.0977 44.1713 43.774 43.6522 43.543L32.6207 38.6357C32.3158 38.5 31.966 38.6956 31.9219 39.0264L30.1753 52.1236C30.0982 52.7021 29.2612 52.7021 29.1841 52.1236L27.4375 39.0264C27.3934 38.6956 27.0436 38.5 26.7387 38.6357L15.7072 43.543C15.1881 43.774 14.7472 43.0977 15.168 42.7159L24.6105 34.149C24.8292 33.9506 24.8292 33.6069 24.6105 33.4084L15.168 24.8416C14.7472 24.4598 15.1881 23.7835 15.7072 24.0144L26.7387 28.9218C27.0436 29.0575 27.3934 28.8619 27.4375 28.5311L29.1841 15.4339Z"
            fill="#ECECEC"
          />
          <path
            d="M29.3827 15.4606C29.429 15.1135 29.9311 15.1135 29.9774 15.4606L31.7235 28.5573C31.7853 29.0205 32.2751 29.2941 32.702 29.1042L43.7333 24.1969C44.0448 24.0584 44.309 24.4639 44.0565 24.693L34.6141 33.2604C34.3082 33.5382 34.3081 34.0198 34.6141 34.2975L44.0565 42.8639C44.309 43.093 44.0448 43.4986 43.7333 43.36L32.702 38.4528C32.2752 38.2629 31.7854 38.5367 31.7235 38.9997L29.9774 52.0973C29.931 52.4442 29.4292 52.4442 29.3827 52.0973L27.6356 38.9997C27.5737 38.5367 27.084 38.2629 26.6571 38.4528L15.6259 43.36C15.3144 43.4986 15.0501 43.093 15.3026 42.8639L24.745 34.2975C25.0512 34.0197 25.0511 33.5382 24.745 33.2604L15.3026 24.693C15.0503 24.464 15.3145 24.0586 15.6259 24.1969L26.6571 29.1042C27.0841 29.2941 27.5738 29.0205 27.6356 28.5573L29.3827 15.4606Z"
            stroke="#ECECEC"
            strokeWidth="1"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_8_113"
            x="0"
            y="0"
            width="59.3594"
            height="67.5575"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="7.5" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_8_113"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_8_113"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    );
  } else if (hours === "4") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 46 48"
        className="h-full w-full"
        fill={colour}
        fillOpacity={opacity}
      >
        <g filter="url(#filter0_d_63_13)">
          <path
            d="M21.9065 10.6821C22.2115 9.77264 23.4978 9.77264 23.8027 10.6821L26.6252 19.0987C26.7177 19.3746 26.9259 19.5966 27.1953 19.7066L35.0872 22.929C35.9165 23.2676 35.9165 24.4419 35.0872 24.7806L27.1953 28.0029C26.9259 28.113 26.7177 28.3349 26.6252 28.6108L23.8027 37.0275C23.4978 37.9369 22.2115 37.9369 21.9065 37.0275L19.084 28.6108C18.9915 28.3349 18.7834 28.113 18.5139 28.0029L10.622 24.7806C9.79268 24.4419 9.79268 23.2676 10.622 22.929L18.5139 19.7066C18.7834 19.5966 18.9915 19.3747 19.084 19.0987L21.9065 10.6821Z"
            fill="#ECECEC"
          />
          <path
            d="M22.0958 10.7454C22.3399 10.018 23.3694 10.018 23.6134 10.7454L26.4357 19.1624C26.5467 19.4933 26.7961 19.7598 27.1193 19.8919L35.0118 23.1145C35.6749 23.3856 35.6749 24.324 35.0118 24.595L27.1193 27.8177C26.7961 27.9497 26.5467 28.2162 26.4357 28.5471L23.6134 36.9641C23.3694 37.6915 22.3399 37.6915 22.0958 36.9641L19.2736 28.5471C19.1625 28.2162 18.9131 27.9497 18.59 27.8177L10.6974 24.595C10.0344 24.324 10.0344 23.3856 10.6974 23.1145L18.59 19.8919C18.9131 19.7598 19.1625 19.4933 19.2736 19.1624L22.0958 10.7454Z"
            stroke="white"
            strokeWidth="0.4"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_63_13"
            x="0"
            y="0"
            width="45.7092"
            height="47.7095"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="5" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_63_13"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_63_13"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    );
  }

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 65 67" fill="none">
      <g filter="url(#filter0_d_194_24)">
        <path
          d="M31.5976 15.3996C31.7068 14.8668 32.468 14.8668 32.5772 15.3996L35.4217 29.2762C35.473 29.5268 35.7053 29.6982 35.9599 29.6734L48.625 28.442C49.1393 28.392 49.3823 29.0599 48.956 29.352L37.9506 36.8958C37.7613 37.0255 37.6846 37.2674 37.7646 37.4824L42.7195 50.8121C42.9058 51.3133 42.2814 51.7178 41.9002 51.3428L32.4381 42.0347C32.2435 41.8433 31.9314 41.8433 31.7368 42.0347L22.2746 51.3428C21.8934 51.7178 21.269 51.3133 21.4553 50.8121L26.4102 37.4824C26.4902 37.2674 26.4135 37.0255 26.2243 36.8958L15.2188 29.352C14.7925 29.0599 15.0355 28.392 15.5499 28.442L28.2149 29.6734C28.4696 29.6982 28.7018 29.5268 28.7532 29.2762L31.5976 15.3996Z"
          fill="#ECECEC"
        />
        <path
          d="M31.7933 15.4397C31.8589 15.1201 32.3157 15.1201 32.3812 15.4397L35.226 29.3167C35.298 29.6672 35.6227 29.9068 35.9789 29.8723L48.6439 28.6409C48.9524 28.6109 49.0986 29.0114 48.8431 29.1868L37.8373 36.7307C37.5724 36.9124 37.4656 37.251 37.5775 37.552L42.5316 50.8821C42.6433 51.1827 42.2691 51.4253 42.0404 51.2005L32.5785 41.8919C32.3061 41.6239 31.8685 41.6239 31.5961 41.8919L22.1342 51.2005C21.9055 51.425 21.5314 51.1826 21.6429 50.8821L26.598 37.552C26.7098 37.251 26.6022 36.9123 26.3373 36.7307L15.3314 29.1868C15.0763 29.0113 15.2222 28.6109 15.5306 28.6409L28.1957 29.8723C28.5519 29.9069 28.8765 29.6673 28.9486 29.3167L31.7933 15.4397Z"
          stroke="#ECECEC"
          stroke-width="0.4"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_194_24"
          x="0"
          y="0"
          width="64.1748"
          height="66.4895"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="7.5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_194_24"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_194_24"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}

export default TreeIcon;
