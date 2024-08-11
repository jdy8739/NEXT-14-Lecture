import Link from 'next/link';

export default function Home() {
  return (
    <main className="h-full flex items-center justify-center">
      <div className="h-3/6 flex flex-col justify-between">
        <div className="flex flex-col gap-2">
          <div className="text-9xl text-center">🥕</div>
          <div className="text-2xl text-center font-extrabold">당근</div>
          <div className="text-center">당근 마켓에 어서오세요!</div>
        </div>
        <div className="flex flex-col gap-2">
          <button className="w-80 py-2 rounded-lg text-sm font-semibold bg-orange-500">
            시작하기
          </button>
          <div className="flex justify-center gap-4">
            <span className="text-sm">이미 계정이 있나요?</span>
            <Link
              href="#"
              className="text-sm hover:underline underline-offset-2 text-orange-500"
            >
              로그인
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
