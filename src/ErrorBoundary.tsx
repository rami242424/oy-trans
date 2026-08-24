import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("OY-trans error:", error, info.componentStack);
  }

  handleReset = () => {
    this.setState({ hasError: false });
    window.location.reload();
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-8 text-center">
        <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#F2F4EC] text-[26px] mb-5">
          🌿
        </div>
        <h1 className="text-[19px] font-extrabold text-[#191B17] mb-2">
          화면을 불러오지 못했어요
        </h1>
        <p className="text-[13.5px] text-[#8A8D83] leading-relaxed mb-7">
          일시적인 오류가 발생했습니다.
          <br />
          아래 버튼을 눌러 다시 시작해 주세요.
        </p>
        <button
          onClick={this.handleReset}
          className="px-7 py-3.5 rounded-xl bg-[#8ED320] text-[#16250B] text-[15px] font-extrabold transition-transform active:scale-95 shadow-[0_4px_14px_rgba(142,211,32,0.35)]"
        >
          다시 시작하기
        </button>
      </div>
    );
  }
}

export default ErrorBoundary;