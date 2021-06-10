import React from "react";
import InfoInput, { InfoInputProps } from "./InfoInput";
import { Procedure } from "../../pages/Hospital/Containers/Preview";
import gray_x_icon from "../../images/gray-x-icon.svg";
import "./ProcInput.scss";

interface FlatInputProps extends InfoInputProps {
  titleStyle?: string; // "short" | "medium"
}

const FlatInput = (props: FlatInputProps) => {
  return (
    <div className="flat-input-container">
      <div
        className={`flat-input-title ${
          props.titleStyle ? props.titleStyle : ""
        }`}
      >
        {props.title}
      </div>
      <InfoInput value={props.value} onChange={props.onChange} />
    </div>
  );
};

interface RangeInputProps {
  title: string;
  maxVal: string;
  minVal: string;
  onMaxChange: React.ChangeEventHandler<HTMLInputElement>;
  onMinChange: React.ChangeEventHandler<HTMLInputElement>;
}

const RangeInput = (props: RangeInputProps) => {
  return (
    <div className="range-input-container">
      <div className="range-input-title">{props.title}</div>
      <div className="range-input-wrapper">
        <div className="range-single-input-wrapper">
          <div className="range-single-input-desc-text">From</div>
          <InfoInput
            value={props.minVal?.toLocaleString()}
            onChange={props.onMinChange}
          />
        </div>
        <div className="range-input-btwn-dash">-</div>
        <div className="range-single-input-wrapper">
          <div className="range-single-input-desc-text">To</div>
          <InfoInput
            value={props.maxVal?.toLocaleString()}
            onChange={props.onMaxChange}
          />
        </div>
      </div>
    </div>
  );
};

interface InfoTextAreaProps {
  title?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
}

const InfoTextArea = (props: InfoTextAreaProps) => {
  return (
    <div className="info-textarea-container">
      {props.title && <div className="info-textarea-title">{props.title}</div>}
      <textarea
        className="info-textarea"
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
};

interface ProcInputProps extends Procedure {
  update: (key: string, val: any) => void;
  deletable?: boolean;
  deleteHandler?: () => void;
}

const ProcInput = (props: ProcInputProps) => {
  return (
    <div className="proc-input-container">
      {props.deletable && (
        <img
          className="proc-delete-x-icon"
          src={gray_x_icon}
          alt="proc-x-icon"
          onClick={props.deleteHandler}
        />
      )}
      <div className="proc-input-item more-space">
        <FlatInput
          title="Procedure"
          value={props.name}
          onChange={(e) => props.update("name", e.target.value)}
        />
      </div>
      <div className="proc-input-item more-space">
        <RangeInput
          title="Cost"
          maxVal={props.priceMax!}
          minVal={props.priceMin!}
          onMaxChange={(e) => props.update("priceMax", e.target.value)}
          onMinChange={(e) => props.update("priceMin", e.target.value)}
        />
      </div>
      <div className="proc-input-item more-space">
        <InfoTextArea
          title="수술 방안"
          value={props.methodology || ""}
          onChange={(e) => props.update("methodology", e.target.value)}
        />
      </div>
      <div className="proc-input-item">
        <FlatInput
          title="수술 시간"
          titleStyle="medium"
          value={props.operationTime || ""}
          onChange={(e) => props.update("operationTime", e.target.value)}
        />
      </div>
      <div className="proc-input-item">
        <FlatInput
          title="마취 방식"
          titleStyle="medium"
          value={props.anesthesiaType || ""}
          onChange={(e) => props.update("anesthesiaType", e.target.value)}
        />
      </div>
      <div className="proc-input-item">
        <FlatInput
          title="회복 시간"
          titleStyle="medium"
          value={props.recoveryTime || ""}
          onChange={(e) => props.update("recoveryTime", e.target.value)}
        />
      </div>
      <div className="proc-input-item more-space">
        <FlatInput
          title="실밥 제거 시기"
          titleStyle="medium"
          value={props.sutureRemovalTime || ""}
          onChange={(e) => props.update("sutureRemovalTime", e.target.value)}
        />
      </div>
      <div className="proc-input-item">
        <InfoTextArea
          title="주의점"
          value={props.warning || ""}
          onChange={(e) => props.update("warning", e.target.value)}
        />
      </div>
      <div className="proc-input-item">
        <InfoTextArea
          title="시술 후 관리"
          value={props.afterCare || ""}
          onChange={(e) => props.update("afterCare", e.target.value)}
        />
      </div>
    </div>
  );
};

export default ProcInput;
