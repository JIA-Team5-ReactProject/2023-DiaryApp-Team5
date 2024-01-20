import AWS from "aws-sdk";
import { useSetRecoilState } from "recoil";
import { s3UploadState } from "../store/recoil";

// 밑에 내용 나중에 추가
// S3 기본 설정(리전, 액세스 키, 시크릿 액세스 키)
const S3_BUCKET = "j1a";
const REGION = process.env.REACT_APP_AWS_REGION;

AWS.config.update({
  region: REGION,
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
});

// S3 인스턴스 생성 -> S3 버킷 접근 가능(즉, 업로드 가능하다는 뜻)
const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
});

export function useS3Uploader() {
  const setUploadStatus = useSetRecoilState(s3UploadState); // recoil 상태 관리

  // S3에 파일을 업로드함
  const uploadFileToS3 = (file) => {
    const params = {
      // 업로드 설정
      ACL: "public-read", // 공개적으로 read 할 수 있음
      Body: file, // file 객체를 인자로 받음
      Bucket: S3_BUCKET,
      Key: `test/${file.name}`, // 버킷 이름 적기
    };

    // 업로드 진행 상황 위해 Promise 사용 : 업로드 성공 -> resolve / 실패 -> reject
    return new Promise((resolve, reject) => {
      myBucket
        .putObject(params) // s3 버킷에 업로드(putObject: S3 SDK 함수)
        .on("httpUploadProgress", (evt) => {
          // 업로드 진행 상황 추적
          setUploadStatus({
            progress: Math.round((evt.loaded / evt.total) * 100),
            status: "Uploading...",
          });
        })
        .send((err, data) => {
          // 오류가 있을 경우 recoil 상태 업데이트 및 reject 발생
          if (err) {
            setUploadStatus({ progress: 0, status: "Failed" });
            reject(err);
          } else {
            const imageUrl = `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/${params.Key}`; // 성공 시 URL 반환
            setUploadStatus({ progress: 100, status: "Uploaded" });
            resolve(imageUrl);
          }
        });
    });
  };

  return { uploadFileToS3 };
}
