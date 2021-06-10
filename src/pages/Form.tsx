import React, { useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from "react-router";
import Button from "../components/Button/Button";
import CategoryButton from "../components/Button/CategoryButton";
import DescriptionButton from "../components/Button/DescriptionButton";
import PhotoInput from "../components/Input/PhotoInput";
import PhotoPreview from "../components/PhotoPreview/PhotoPreview";
import { setQuote } from "../store/reducers/quote";
import { dummyData, isUserSignedIn } from "../utils";
import { SignUpForm } from "../pages/SignUp";

import "./Form.scss";
import Status from "../components/Status/Status";
import { postQuote } from "../api/quote";
import { RootState } from "../store";
import { UserProps } from "../auth/auth";
import { FormattedMessage, useIntl } from "react-intl";

import eyes from "../images/eyes.png";
import nose from "../images/nose.png";
import facial_contouring from "../images/facial_contouring.png";
import breast from "../images/breast.png";
import liposuction from "../images/liposuction.png";
import fat_grafting from "../images/fat_grafting.png";
import skin from "../images/skin.png";
import petit from "../images/petit.png";
import mouth from "../images/mouth.png";
import tooth_eyesight from "../images/tooth_eyesight.png";

interface SurgicalOption {
  name: string;
  id: string;
  textId?: string;
  subCategories?: SurgicalOption[];
  done?: boolean;
}

interface Selection {
  categoryId: string;
  subCategoryIds?: string[];
}

interface Props extends RouteComponentProps {}

const Form = (props: Props) => {
  // TODO: fetch rootOptions from DB - replace dummyData
  const [rootOptions, setRootOptions] =
    useState<SurgicalOption[] | undefined>(dummyData);
  const [formList, setFormList] =
    useState<SurgicalOption[] | undefined>(dummyData);
  const [step, setStep] = useState(0); // 0 - category, 1 - procedure, 2 - photo, 3 - comment, 4 - done
  const [subStep, setSubStep] = useState(0);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [result, setResult] = useState<Selection[]>([]);
  const [thumbnails, setThumbnails] = useState<string[]>([]);
  const [headerMsgId, setHeaderMsgId] = useState("");
  const [headerValues, setHeaderValues] = useState({});
  const [comment, setComment] = useState("");
  const [isSubmitReady, setIsSubmitReady] = useState(false);
  const [isSubmitInProgress, setIsSubmitInProgress] = useState(false);
  const dispatch = useDispatch();
  const user: UserProps = useSelector((state: RootState) => state.user.current);
  const intl = useIntl();

  const imagesMap: { [key: string]: string } = {
    eyes,
    nose,
    facial_contouring,
    breast,
    liposuction,
    fat_grafting,
    skin,
    petit,
    mouth,
    tooth_eyesight,
  };

  useEffect(() => {
    let msgId = "";
    let values = {};
    switch (step) {
      case 0:
        msgId = "form.case0.msg";
        break;
      case 1:
        const categoryTextId = rootOptions?.find(
          (category) => category.id === result[subStep].categoryId,
        )?.textId;
        const categoryName = intl.formatMessage({ id: categoryTextId });
        msgId = "form.case1.msg";
        values = { categoryName };
        break;
      case 2:
        const categoryTextIds = result.map(
          ({ categoryId }) =>
            rootOptions?.find((category) => category.id === categoryId)?.textId,
        );
        const categoryNames = categoryTextIds
          .map((id) => intl.formatMessage({ id }))
          .join(", ");
        msgId = "form.case2.msg";
        values = { categoryNames };
        break;
      case 3:
        msgId = "form.case3.msg";
        break;
      case 4:
        msgId = "form.case4.msg";
        break;
      case 5:
        msgId = "form.case5.msg";
        break;
    }
    setHeaderMsgId(msgId);
    setHeaderValues(values);
  }, [step, rootOptions, result, subStep]);

  const fetchSelectedFormList = useCallback(
    (subStep) => {
      const currCategory = result[subStep];
      const currFormList = rootOptions?.find(
        (option) => option.id === currCategory.categoryId,
      );
      setSelectedIds(currCategory?.subCategoryIds || []);
      setFormList(currFormList?.subCategories);
    },
    [result, rootOptions],
  );

  const handleSubmit = useCallback(async () => {
    setIsSubmitInProgress(true);
    const body = {
      sub: user.sub!,
      quote: result,
      comment,
      timestamp: new Date().getTime(),
    };
    await postQuote(body);
    setIsSubmitInProgress(false);
  }, [comment, result, user]);

  const goPrev = useCallback(() => {
    if (step === 1) {
      if (subStep > 0) {
        fetchSelectedFormList(subStep - 1);
        setSubStep((s) => s - 1);
      } else {
        // TODO: show warning modal - "data will be gone"
        setFormList(rootOptions);
        setSelectedIds([]);
        setResult([]);
        setStep((s) => s - 1);
      }
    } else if (step === 2) {
      fetchSelectedFormList(subStep);
      setStep((s) => s - 1);
    } else {
      setStep((s) => s - 1);
    }
  }, [step, subStep, rootOptions, fetchSelectedFormList]);

  const goNext = useCallback(async () => {
    if (step === 0) {
      const categories = formList
        ?.filter((category) => selectedIds.includes(category.id))
        .map((item) => item.subCategories);
      const tempResult = selectedIds.map((id) => {
        return { categoryId: id };
      });
      setResult(tempResult);
      setFormList(categories![0]);
      setSelectedIds([]);
      setStep((s) => s + 1);
    } else if (step === 1) {
      const currCategory = result[subStep];
      const newCategory = { ...currCategory, subCategoryIds: selectedIds };
      const newResult = [...result];
      newResult[subStep] = newCategory;
      setResult(newResult);
      if (subStep < result.length - 1) {
        fetchSelectedFormList(subStep + 1);
        setSubStep((s) => s + 1);
      } else {
        setStep((s) => s + 1);
      }
    } else if (step === 2) {
      setStep((s) => s + 1);
    } else if (step === 3) {
      if (isUserSignedIn(user)) {
        await handleSubmit();
        setStep((s) => s + 2);
      } else {
        setStep((s) => s + 1);
      }
    } else if (step === 4) {
      setStep((s) => s + 1);
      dispatch(setQuote(result));

      await handleSubmit();
    } else if (step === 5) {
      props.history.push("/mypage");
    } else {
      setStep((s) => s + 1);
    }
  }, [
    step,
    subStep,
    result,
    selectedIds,
    formList,
    fetchSelectedFormList,
    dispatch,
    props.history,
    user,
    handleSubmit,
  ]);

  const onSelect = (viewType: string, id: string) => () => {
    setSelectedIds((ids) => {
      if (ids.includes(id)) {
        return ids.filter((iid) => iid !== id);
      } else {
        if (viewType === "sub") {
          return [id];
        } else if (viewType === "main" && ids.length < 3) {
          return ids.concat(id);
        } else {
          return ids;
        }
      }
    });
  };

  const photoUploadHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const fileNum = Object.keys(event.target.files).length;
      const urlsToUpload: string[] = [];
      const filesToUpload = [];

      Object.entries(event.target.files).forEach(([_, file]) => {
        let reader = new FileReader();
        // let file = event.target.files![fileIndex];
        // TODO : 취소하고 창 닫았을 때 에러처리
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          const url = reader.result;
          if (url) {
            urlsToUpload.push(url.toString());
            filesToUpload.push(file);
            if (urlsToUpload.length === fileNum) {
              setThumbnails([...thumbnails, ...urlsToUpload]);
              // setImageAttachments([...imageAttachments, ...filesToUpload]);
            }
          } else {
            throw new Error("Error: occured while reading file");
          }
        };
      });
    }
  };

  const photoDeleteHandler = (photoInd: number) => {
    const newThumbnails = thumbnails.slice();
    newThumbnails.splice(photoInd, 1);
    setThumbnails(newThumbnails);
  };

  return (
    <div className="form-page-container">
      <div className="form-header-container">
        <Status
          step={step}
          subStep={subStep}
          maxSubStep={result.length}
          isSignedIn={isUserSignedIn(user)}
        />
        {/* TODO: category preview */}
        {headerMsgId && (
          <div className="form-header-msg">
            <FormattedMessage id={headerMsgId} values={headerValues} />
          </div>
        )}
      </div>
      <div className={`form-body-container ${step === 0 ? "grid-view" : ""}`}>
        {step < 2 ? (
          formList?.map((data: SurgicalOption) =>
            step === 0 ? (
              <CategoryButton
                text={data.name}
                textId={data.textId}
                key={data.id}
                selectedIds={selectedIds}
                id={data.id}
                onClick={onSelect("main", data.id)}
                image={imagesMap[data.id]}
              />
            ) : (
              <DescriptionButton
                text={data.name}
                textId={data.textId}
                key={data.id}
                selectedIds={selectedIds}
                id={data.id}
                onClick={onSelect("sub", data.id)}
              />
            ),
          )
        ) : step === 2 ? (
          <div className="form-thumbnails-container">
            {thumbnails.map((thumbnail, ind) => (
              <PhotoPreview
                key={ind}
                src={thumbnail}
                photoInd={ind}
                deleteNthPhoto={photoDeleteHandler}
              />
            ))}
            <PhotoInput onPhotoUpload={photoUploadHandler} />
          </div>
        ) : step === 3 ? (
          <div className="form-comment-container">
            <FormattedMessage id="placeholder.leaveComment">
              {(message: string) => (
                <textarea
                  className="form-comment-textarea"
                  placeholder={message}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              )}
            </FormattedMessage>
          </div>
        ) : step === 4 ? (
          <div className="signup-page-container no-padding">
            <SignUpForm setSubmitReady={setIsSubmitReady} />
          </div>
        ) : (
          <div className="form-complete-container">
            <FormattedMessage id="form.case5.text" />
          </div>
        )}
      </div>
      <div className="form-footer-button-container">
        {step > 0 && step < 5 && (
          <Button
            text="Prev"
            textId="button.previous"
            theme="gray"
            shape="round"
            onClick={goPrev}
          />
        )}
        {step > 0 && step < 5 && <div className="form-footer-gap" />}
        <Button
          text={
            (isUserSignedIn(user) && step === 3) || step === 4
              ? "Submit"
              : step === 5
              ? "Go to My Page"
              : "Next"
          }
          textId={
            (isUserSignedIn(user) && step === 3) || step === 4
              ? "button.submit"
              : step === 5
              ? "button.goToMyPage"
              : "button.next"
          }
          theme="primary"
          shape="round"
          onClick={goNext}
          isDisabled={
            selectedIds.length === 0 || (step === 4 && !isSubmitReady)
          }
          isLoading={isSubmitInProgress}
        />
      </div>
    </div>
  );
};

export default Form;
