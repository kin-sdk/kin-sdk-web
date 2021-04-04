DL_PATH="tmp/download"
SDK_PATH="libs/sdk"
PROTO_COMMON_PATH="${SDK_PATH}/proto-common"

mkdir -p "$PROTO_COMMON_PATH" "$SDK_PATH" "$DL_PATH"

# Download agora proto files
git clone https://github.com/kintegrate/agora-api "${DL_PATH}/agora-api" --depth 1
cp -r "${DL_PATH}/agora-api/proto" "${SDK_PATH}"

# Download dependencies
git clone https://github.com/envoyproxy/protoc-gen-validate  "${DL_PATH}/protoc-gen-validate" --depth 1
git clone https://github.com/googleapis/googleapis "${DL_PATH}/googleapis" --depth 1
cp -r "${DL_PATH}/protoc-gen-validate/validate" "${PROTO_COMMON_PATH}/validate"
cp -r "${DL_PATH}/googleapis/google" "${PROTO_COMMON_PATH}"

# Remove temp repos
rm -rf "${DL_PATH}/protoc-gen-validate" "${DL_PATH}/googleapis" "${DL_PATH}/agora-api"
