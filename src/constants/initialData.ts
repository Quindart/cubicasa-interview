export const INITIAL_BODY_DATA = {
  globalModelOptions: {
    unit: 'ft',
    showSpaceLabels: true,
    areaLabelType: 'detail',
    outerMeasurements: false,
    noLabelsAndDimensionsForSpaceTypes: ['Undefined', 'Outdoor', 'CrawlSpace'],
    noDimensionsForSpaceTypes: [
      'Terrace',
      'Balcony',
      'Deck',
      'Patio',
      'Porch',
      'Yard',
      'Veranda',
      'SwimmingPool',
      'OpenToBelow'
    ],
    dimensions: { text: true, markers: false },
    area: false,
    areaSpecification: 'GIA',
    noFloorLabelInSingleFloorCompose: false,
    swingDoorOpeningAngle: 0,
    elementStyles: {
      Space: {
        style: {
          fill: '#ffffff',
          stroke: '#ffffff',
          'fill-opacity': 1,
          'stroke-opacity': 1,
          'stroke-width': 1.8
        },
        spaceTypeStyle: {
          Balcony: {
            fill: '#ffffff',
            'fill-opacity': 1,
            stroke: '#000000',
            'stroke-opacity': 1,
            'stroke-width': 1
          }
          // ... các space types khác bạn có thể thêm vào đây
        }
      },
      Wall: {
        style: {
          fill: '#000000',
          stroke: '#000000',
          'fill-opacity': 1,
          'stroke-opacity': 1,
          'stroke-width': 1
        }
      },
      Column: { style: { fill: '#000000', stroke: 'none', 'fill-opacity': 1 } },
      FixedFurniture: {
        style: {
          fill: '#ffffff',
          stroke: '#000000',
          'fill-opacity': 0,
          'stroke-opacity': 0,
          'stroke-width': 1.8
        }
      },
      Door: {
        style: { fill: '#ffffff', stroke: '#000000', 'fill-opacity': 1, 'stroke-opacity': 1 }
      }
    }
  },
  exports: [
    {
      zip: false,
      loc: 'en-pr',
      fileNamePrefix: 'Lite',
      singleFloor: {
        resolution: { width: 4000, height: 3000 },
        backgroundColor: '#ffffff',
        backgroundOpacity: 1,
        format: 'png',
        dpi: 144,
        layout: { height: 0.82, width: 0.94, top: 0.03, left: 0.03 },
        overlay: {
          overlayLabels: [
            {
              type: 'text',
              text: {
                en: [
                  'MEASUREMENTS ARE CALCULATED BY CUBICASA TECHNOLOGY. DEEMED HIGHLY RELIABLE BUT NOT GUARANTEED.'
                ]
              },
              color: '#AAAAAA',
              layout: { height: 0.017, bottom: 0.03 }
            }
          ]
        }
      }
    }
  ]
};

export const FIELD_DICTIONARY = {
  unit: 'Đơn vị đo lường (Feet hoặc Mét).',
  showSpaceLabels: 'Hiển thị tên các phòng (Living Room, Kitchen...).',
  areaLabelType: 'Kiểu hiển thị diện tích (chi tiết hoặc rút gọn).',
  outerMeasurements: 'Bật/Tắt đường đo kích thước tổng thể bên ngoài nhà.',
  swingDoorOpeningAngle: 'Góc mở của cánh cửa trên bản vẽ (thường là 0, 45 hoặc 90).',
  areaSpecification: 'Tiêu chuẩn đo diện tích (ví dụ GIA là Gross Internal Area).',
  'elementStyles.Wall.style.fill': 'Màu sắc đổ bóng cho các bức tường.',
  'elementStyles.Space.style.fill': 'Màu nền chung cho không gian các phòng.',
  'exports[0].singleFloor.format': 'Định dạng file xuất ra (PNG, JPG hoặc PDF).',
  'exports[0].singleFloor.dpi': 'Độ phân giải của ảnh (DPI càng cao ảnh càng nét).'
};