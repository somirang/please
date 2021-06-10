import React from "react";
import "./Landing.scss";
import landing_1 from "../images/landing-1.png";
import landing_2 from "../images/landing-2.png";
import landing_3 from "../images/landing-3.svg";
import karamel_logo from "../images/karamel-logo.png";
import Button from "../components/Button/Button";
import { RouteComponentProps } from "react-router";

const Landing = (props: RouteComponentProps) => {
  return (
    <div className="landing-page-container">
      <div className="landing-page-body-container">
        <div className="landing-page-body-section">
          <img src={landing_1} alt="landing-1" />
          <div className="landing-page-body-desc-container">
            <div className="landing-page-body-desc-main-text">
              <div className="landing-page-body-desc-main-text-purple">
                외부미를
              </div>{" "}
              추구하다
            </div>
            <div className="landing-page-body-desc-sub-text">
              한국내 전문 성형외과, 피부과, 치과 대기 중
            </div>
            <div className="landing-page-body-desc-button-container">
              <Button
                text="고민 해결하기"
                shape="square"
                theme="primary"
                size="small"
                style={{ height: "30px" }}
                onClick={() => props.history.push("/form")}
              />
            </div>
          </div>
        </div>
        <div className="landing-page-body-section">
          <img src={landing_2} alt="landing-2" />
          <div className="landing-page-body-desc-container">
            <div className="landing-page-body-desc-main-text">
              <div className="landing-page-body-desc-main-text-purple">
                내부 건강을
              </div>{" "}
              추구하다
            </div>
            <div className="landing-page-body-desc-sub-text">
              한국내 전문 여성내과 원장님이 상담 대기 중
            </div>
            <div className="landing-page-body-desc-button-container">
              <Button
                text="고민 해결하기"
                shape="square"
                theme="primary"
                size="small"
                style={{ height: "30px" }}
                onClick={() =>
                  window.open("https://jinshuju.net/f/s8X49B", "_blank")
                }
              />
            </div>
          </div>
        </div>
        <div className="landing-page-body-section soft-purple">
          <div className="landing-page-body-desc-container text-align-left">
            <img
              className="landing-page-body-karamel-logo"
              src={karamel_logo}
              alt="karamel-logo"
            />
            <div className="landing-page-body-desc-sub-text text-align-center">
              외국인환자와 한국의사가 만나다
            </div>
          </div>
          <img
            className="landing-page-body-landing-3-img"
            src={landing_3}
            alt="landing-3"
          />
        </div>
      </div>

      <div className="landing-page-footer-container">
        <div className="landing-page-footer-row">
          <div className="landing-page-footer-row-item">KARAMEL</div>
          <div className="landing-page-footer-row-item">
            <div className="landing-page-footer-row-item-inner">
              개인정보처리방침
            </div>
            <div className="landing-page-footer-row-item-inner">이용약관</div>
          </div>
        </div>
        <div className="landing-page-footer-row">
          <div className="landing-page-footer-row-title">이메일</div>
          <div className="landing-page-footer-row-content">
            help@mediround.co.kr
          </div>
        </div>
        <div className="landing-page-footer-row">
          <div className="landing-page-footer-row-title">문의 가능 시간</div>
          <div className="landing-page-footer-row-content">
            평일 9:00-18:00 (한국시간)
            <br />
            평일 8:00-17:00 (중국시간)
            <br />
            (점심시간 12:00-13:00 제외 / 주말 및 공휴일 제외)
          </div>
        </div>
        <div className="landing-page-footer-details-container">
          <div className="landing-page-footer-details-row title">
            주식회사 메디라운드
          </div>
          <div className="landing-page-footer-details-row">
            대표이사 : 신영종
          </div>
          <div className="landing-page-footer-details-row">
            사업자등록번호 : 317-87-01456
          </div>
          <div className="landing-page-footer-details-row">
            외국인환자유치업등록번호 : 제 A-2019-01-01-3722 호
          </div>
          <div className="landing-page-footer-details-row">
            벤처기업인증번호 : 제20210317010001호
          </div>
          <div className="landing-page-footer-details-row">
            서울특별시 강남구 테헤란로 146 12층 1205호
          </div>
          <div className="landing-page-footer-details-row">
            COPYRIGHT(C) MEDIROUND ALL RIGHTS RESERVED
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
